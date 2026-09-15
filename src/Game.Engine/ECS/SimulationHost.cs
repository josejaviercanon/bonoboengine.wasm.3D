namespace Game.Engine.ECS;

/// <summary>
///     Host-agnostic simulation control: owns the lazily-created ECS simulations, wires
///     each one to a pinned zero-copy render transport, and exposes connect/pause verbs to
///     the presentation host. The same class backs the browser-wasm host
///     (<c>Game.Wasm</c>, notification → <c>localHeapViewF64</c>) and the WinApp host
///     (<c>Game.WinApp</c>, notification → WebView2 shared buffer). All buffers are pure
///     64-bit doubles: there is no per-signal scalar size.
/// </summary>
public sealed class SimulationHost : IDisposable
{
    /// <summary>
    ///     Delivers a committed buffer to the presentation host: event name, pinned address and
    ///     element count. Scalar elements are always 8-byte doubles. The pointer is
    ///     host-width (<c>nint</c>; 32-bit on browser-wasm, 64-bit on native) and is only
    ///     valid until the buffer grows — consumers must not cache it.
    /// </summary>
    public delegate void BufferNotify(string eventName, nint bufferPtr, int elementCount);

    /// <summary>Initial element capacity of the "sprite-move" (float64) buffer.</summary>
    public const int EcsBufferCapacity = 128;

    /// <summary>Initial element capacity of the "transform3d" (float64) buffer.</summary>
    public const int Transform3DBufferCapacity = 512;

    private readonly BufferNotify _notify;
    private readonly Dictionary<string, IDisposable> _buffers = new();
    private readonly object _sync = new();
    private string? _activeGame;

    private EcsSimulation? _ecs;
    private Transform3DEcsSimulation? _transform3d;
    private Game.Engine.Config.GameWorldConfig? _worldConfig;

    public SimulationHost(BufferNotify notify)
    {
        _notify = notify;
    }

    /// <summary>
    ///     Last configuration load error (null when the last load succeeded or nothing was
    ///     loaded yet). The engine falls back to <c>GameWorldConfig.Default</c>.
    /// </summary>
    public string? ConfigurationError { get; private set; }

    /// <summary>
    ///     Parses <c>assets/config.bin</c> bytes supplied by the host (browser fetch or
    ///     native file read) and applies them to future simulations. Returns false and keeps
    ///     the defaults when the payload is invalid; <see cref="ConfigurationError"/> explains why.
    /// </summary>
    public bool LoadConfiguration(ReadOnlySpan<byte> bytes)
    {
        if (Game.Engine.Config.BinaryConfigReader.TryRead(bytes, out var config, out var error))
        {
            lock (_sync)
            {
                _worldConfig = config;
            }

            ConfigurationError = null;
            return true;
        }

        ConfigurationError = error;
        return false;
    }

    /// <summary>Queues one 3D entity spawn (no-op when the transform3d sim is not connected).</summary>
    public bool SpawnTransform3D()
    {
        lock (_sync)
        {
            if (_transform3d is null) return false;
            _transform3d.Spawn();
            return true;
        }
    }

    /// <summary>Queues removal of the most recently spawned 3D entity.</summary>
    public bool DespawnTransform3D()
    {
        lock (_sync)
        {
            if (_transform3d is null) return false;
            _transform3d.Despawn();
            return true;
        }
    }

    private PinnedRenderBuffer<T> CreateBuffer<T>(string eventName, int capacity)
        where T : unmanaged
    {
        var buffer = new PinnedRenderBuffer<T>(capacity);
        buffer.OnNotify = name => _notify(name, buffer.Ptr, buffer.ElementCount);
        lock (_sync)
        {
            _buffers[eventName] = buffer;
        }

        return buffer;
    }

    private void UnregisterBuffer(string eventName)
    {
        lock (_sync)
        {
            if (_buffers.Remove(eventName, out var buffer))
                buffer.Dispose();
        }
    }

    public EcsSimulation Ecs => _ecs ??= new EcsSimulation(
        new DirectRenderTransport<EcsRenderSignal, double>(
            "sprite-move",
            SignalBufferEncoders.ElementLength,
            SignalBufferEncoders.Encode,
            CreateBuffer<double>("sprite-move", EcsBufferCapacity)));

    public Transform3DEcsSimulation Transform3D => _transform3d ??= new Transform3DEcsSimulation(
        _worldConfig,
        new DirectRenderTransport<Transform3DRenderSignal, double>(
            "transform3d",
            SignalBufferEncoders.ElementLength,
            SignalBufferEncoders.Encode,
            CreateBuffer<double>("transform3d", Transform3DBufferCapacity)));

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
            case "ecs": _ecs?.Dispose(); _ecs = null; UnregisterBuffer("sprite-move"); break;
            case "transform3d": _transform3d?.Dispose(); _transform3d = null; UnregisterBuffer("transform3d"); break;
        }
        _activeGame = null;
    }

    public void Dispose()
    {
        lock (_sync)
        {
            StopActiveLocked();
        }
    }
}
