using System.Diagnostics;
using Game.Engine.ECS;
using Microsoft.UI.Xaml.Controls;
using Microsoft.Web.WebView2.Core;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace Game_WinApp;

/// <summary>
///     WinApp host page: a WebView2 showing the compiled Babylon.js frontend while the
///     native AOT process runs the ECS/Bepu fixture and streams 3D transforms into the page
///     through WebView2 shared buffers (see <see cref="SharedBufferChannel"/>).
///
///     Channel contract with the page (see <c>wwwroot/js/webview-bridge.js</c>):
///       host → script  sharedbufferreceived (+ {channel, seq, elementCount, scalarSize} JSON)
///                      → typed array view over shared memory, released after dispatch
///       script → host  "connect:{game}" | "pause:1" | "pause:0"
/// </summary>
public sealed partial class MainPage : Page
{
    private const string AppName = "BonoboEngine";

    private readonly SimulationHost _simHost;
    private readonly Dictionary<string, SharedBufferChannel> _channels = new();
    private readonly Dictionary<string, PendingFrame> _pending = new();
    private readonly object _pendingSync = new();

    private CoreWebView2? _core;
    private int _flushQueued;

    private readonly record struct PendingFrame(nint Pointer, int ElementCount, int ScalarSize);

    public MainPage()
    {
        InitializeComponent();

        _simHost = new SimulationHost(OnBufferCommitted);
        _ = InitializeBabylonEngineAsync();
    }

    private async Task InitializeBabylonEngineAsync()
    {
        try
        {
            // 1. Establish an absolute write-safe directory in the user's Local AppData folder.
            //    WebView2 picks it up from WEBVIEW2_USER_DATA_FOLDER when the browser process
            //    is created — the control's CoreWebView2Environment cannot be swapped after
            //    the fact, and EnsureCoreWebView2Async may only be called once.
            var userDataFolder = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), AppName, "WebView2Data");
            Directory.CreateDirectory(userDataFolder);
            Environment.SetEnvironmentVariable("WEBVIEW2_USER_DATA_FOLDER", userDataFolder);

            await BabylonWebView.EnsureCoreWebView2Async();
            _core = BabylonWebView.CoreWebView2;
            if (_core is null) return;

            _core.WebMessageReceived += OnWebMessageReceived;

            // 3. Map the local 'wwwroot' folder next to the binary for virtual asset mapping
            var localAssetFolder = Path.Combine(AppContext.BaseDirectory, "wwwroot");
            _core.SetVirtualHostNameToFolderMapping(
                "babylon.local",
                localAssetFolder,
                CoreWebView2HostResourceAccessKind.Allow);

            // 4. Point the control at the local page (host-specific shell; the bundle itself
            //    is host-agnostic and only requires window.registerLocalBufferProvider).
            BabylonWebView.Source = new Uri("http://babylon.local/index.html");
        }
        catch (Exception ex)
        {
            // Error fallback (e.g., if the WebView2 runtime isn't installed on the OS)
            Debug.WriteLine($"Failed to initialize WebView2: {ex}");
        }
    }

    /// <summary>Low-frequency page → host commands (primitive string, no JSON parsing).</summary>
    private void OnWebMessageReceived(CoreWebView2 sender, CoreWebView2WebMessageReceivedEventArgs args)
    {
        var message = args.TryGetWebMessageAsString();
        if (string.IsNullOrEmpty(message)) return;

        var separator = message.IndexOf(':');
        if (separator <= 0) return;

        var verb = message.AsSpan(0, separator);
        var value = message[(separator + 1)..];

        switch (verb)
        {
            case "connect":
                _simHost.Connect(value);
                break;
            case "pause":
                _simHost.SetPaused(value == "1");
                break;
            default:
                Debug.WriteLine($"Unhandled page command: {message}");
                break;
        }
    }

    /// <summary>
    ///     Simulation callback (timer thread): coalesce to the newest frame per channel and
    ///     marshal onto the UI thread, where the WebView2 shared buffers live.
    /// </summary>
    private void OnBufferCommitted(string eventName, nint bufferPtr, int elementCount, int scalarSize)
    {
        lock (_pendingSync)
        {
            _pending[eventName] = new PendingFrame(bufferPtr, elementCount, scalarSize);
        }

        if (Interlocked.Exchange(ref _flushQueued, 1) != 0) return;
        if (!DispatcherQueue.TryEnqueue(FlushPending))
            Interlocked.Exchange(ref _flushQueued, 0);
    }

    private void FlushPending()
    {
        Interlocked.Exchange(ref _flushQueued, 0);

        KeyValuePair<string, PendingFrame>[] frames;
        lock (_pendingSync)
        {
            if (_pending.Count == 0) return;
            frames = new KeyValuePair<string, PendingFrame>[_pending.Count];
            var index = 0;
            foreach (var pair in _pending)
                frames[index++] = pair;
            _pending.Clear();
        }

        var core = _core;
        if (core is null) return;

        foreach (var (eventName, frame) in frames)
        {
            try
            {
                if (!_channels.TryGetValue(eventName, out var channel))
                {
                    channel = new SharedBufferChannel(core, eventName, frame.ScalarSize, CapacityFor(eventName, frame.ElementCount));
                    _channels[eventName] = channel;
                }

                // The pointer is valid for the lifetime of the pinned engine buffer; the copy
                // into shared memory happens synchronously here on the UI thread.
                channel.Post(frame.Pointer, frame.ElementCount);
            }
            catch (Exception ex)
            {
                // The UI-thread dispatcher fail-fasts on unhandled exceptions, so a broken
                // frame must never take the whole app down: log and keep the last good frame.
                Debug.WriteLine($"Shared-buffer post failed for '{eventName}': {ex}");
            }
        }
    }

    private static int CapacityFor(string eventName, int elementCount) => eventName switch
    {
        "transform3d" => Math.Max(SimulationHost.Transform3DBufferCapacity, elementCount),
        "sprite-move" => Math.Max(SimulationHost.EcsBufferCapacity, elementCount),
        _ => elementCount,
    };

    /// <summary>Stops the simulation and releases the WebView2 shared buffers.</summary>
    public void Shutdown()
    {
        _simHost.Dispose();
        foreach (var channel in _channels.Values)
            channel.Dispose();
        _channels.Clear();
        _core = null;
    }
}
