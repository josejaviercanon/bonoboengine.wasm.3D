using Game.Engine.ECS;
using System.Runtime.Versioning;

namespace Game.Wasm;

[SupportedOSPlatform("browser")]
public sealed class SimHost : IDisposable
{
    private readonly object _sync = new();
    private string? _activeGame;

    private EcsSimulation? _ecs;
    private Transform3DEcsSimulation? _transform3d;


    private static DirectRenderTransport<T> CreateTransport<T>(
        string eventName, Func<T, int> floatLength, Action<T, Span<float>> encode, int bufferCapacity)
    {
        var buffer = new PinnedRenderBuffer(bufferCapacity);
        buffer.OnNotify = name => WasmInterop.Notify(name);
        WasmInterop.RegisterBuffer(eventName, buffer);
        return new DirectRenderTransport<T>(eventName, floatLength, encode, buffer);
    }

    public EcsSimulation Ecs => _ecs ??= new EcsSimulation(
        CreateTransport<EcsRenderSignal>("sprite-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode, 128));

    public Transform3DEcsSimulation Transform3D => _transform3d ??= new Transform3DEcsSimulation(
        CreateTransport<Transform3DRenderSignal>("transform3d", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode, 512));

    public void SetPaused(bool paused)
    {
        // Reserved for future use — per-game Pause/Resume is the active path.
    }

    public void Connect(string game)
    {
        lock (_sync)
        {
            // Always stop the active sim first: switching scenes pauses/unloads
            // the previous simulation, and reloading the same scene restarts it.
            StopActiveLocked();
            switch (game)
            {
                case "ecs": _ = Ecs; break;
                case "transform3d": _ = Transform3D; break;
                case "single-player": break;
                default: break;
            }
            _activeGame = game;
        }
    }

    private void StopActiveLocked()
    {
        if (_activeGame == null) return;
        switch (_activeGame)
        {
            case "ecs": _ecs?.Dispose(); _ecs = null; WasmInterop.UnregisterBuffer("sprite-move"); break;
            case "transform3d": _transform3d?.Dispose(); _transform3d = null; WasmInterop.UnregisterBuffer("transform3d"); break;
        }
        _activeGame = null;
    }

    public void Start(string game)
    {
        lock (_sync)
        {
            switch (game)
            {
            }
        }
    }

    public void Restart(string game)
    {
        lock (_sync)
        {
            switch (game)
            {
            }
        }
    }

    public void Dispose()
    {
        lock (_sync)
        {
            StopActiveLocked();
        }
    }
}