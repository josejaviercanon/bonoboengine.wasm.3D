using Game.Engine.ECS;
using System.Runtime.Versioning;

namespace Game.Wasm;

[SupportedOSPlatform("browser")]
public sealed class SimHost : IDisposable
{
    private readonly object _sync = new();
    private string? _activeGame;

    private EcsSimulation? _ecs;


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

    public void SetPaused(bool paused)
    {
        // Reserved for future use — per-game Pause/Resume is the active path.
    }

    public void Connect(string game)
    {
        lock (_sync)
        {
            if (game == _activeGame) return;
            StopActiveLocked();
            switch (game)
            {
                case "ecs": _ = Ecs; break;
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
            _ecs?.Dispose();
         }
    }
}