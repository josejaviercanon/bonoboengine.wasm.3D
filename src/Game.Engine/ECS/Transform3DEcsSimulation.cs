using System.Diagnostics;
using Arch.Core;
using Arch.Systems;
using Game.Engine.ECS.Systems;

namespace Game.Engine.ECS;

/// <summary>
///     ECS-authoritative 3D demo simulation. Owns an Arch ECS world of
///     <see cref="Transform3DState"/> entities (position + quaternion + scale),
///     ticks the systems at a fixed 60 Hz and pushes a
///     <see cref="Transform3DRenderSignal"/> every tick through the
///     <see cref="IRenderTransport{TSignal}"/> seam into the pinned shared-memory
///     "transform3d" buffer. Deterministic: seeded fixed velocities, no random
///     allocation, single-threaded.
/// </summary>
public sealed class Transform3DEcsSimulation : IDisposable
{
    public const double TickIntervalSeconds = 1.0 / 60.0;
    private const int EntityCount = 12;

    private const float ArenaHalfWidth = 45f;
    private const float ArenaFloorY = -4f;
    private const float ArenaHalfDepth = 45f;

    private readonly World _world;
    private readonly Group<double> _systems;
    private readonly Timer _timer;

    private readonly object _sync = new();
    private long _seq;

    private readonly IRenderTransport<Transform3DRenderSignal> _renderTransport;

    public Transform3DEcsSimulation(IRenderTransport<Transform3DRenderSignal>? renderTransport = null)
    {
        _renderTransport = renderTransport ?? new ServerRenderTransport<Transform3DRenderSignal>();

        _world = World.Create();
        for (var i = 0; i < EntityCount; i++)
        {
            // Deterministic seed: velocities derived from index only.
            var speed = 8f + (i % 4) * 4f;
            var vx = speed * ((i & 1) == 0 ? 1f : -1f);
            var vz = speed * (((i >> 1) & 1) == 0 ? 1f : -1f) * 0.7f;

            _world.Create(
                new Position3(
                    -ArenaHalfWidth * 0.5f + (i * 7.5f % (ArenaHalfWidth * 0.9f)),
                    ArenaFloorY + 2f + (i % 3) * 5f,
                    -ArenaHalfDepth * 0.5f + ((i * 11f) % (ArenaHalfDepth * 0.9f))),
                new Velocity3(vx, 2f + i % 5, vz),
                new Rotation3(0f, 0f, 0f, 1f),
                new AngularVelocity3(
                    0.5f + (i % 3) * 0.4f,
                    0.8f + (i % 4) * 0.3f,
                    0.3f + ((i >> 1) % 3) * 0.5f),
                new Scale3(1f, 1f, 1f),
                new RenderId(i)
            );
        }

        _systems = new Group<double>(
            "Transform3D",
            new MoveBounce3DSystem(_world,
                -ArenaHalfWidth, ArenaHalfWidth,
                ArenaFloorY, ArenaFloorY + 20f,
                -ArenaHalfDepth, ArenaHalfDepth),
            new SpinSystem(_world),
            new ScalePulseSystem(_world)
        );
        _systems.Initialize();

        _timer = new Timer(Tick, null, TimeSpan.Zero, TimeSpan.FromSeconds(TickIntervalSeconds));
    }

    private void Tick(object? _)
    {
        var signal = BuildSignal();
        if (signal is null) return;
        _renderTransport.Push(signal);
    }

    /// <summary>Runs one simulation step and returns the batched 3D transform signal.</summary>
    private Transform3DRenderSignal? BuildSignal()
    {
        lock (_sync)
        {
            var dt = TickIntervalSeconds;
            var stopwatch = Stopwatch.StartNew();
            _systems.BeforeUpdate(in dt);
            _systems.Update(in dt);
            _systems.AfterUpdate(in dt);
            stopwatch.Stop();

            _seq++;
            return new Transform3DRenderSignal(_seq, _world.Size, stopwatch.Elapsed.TotalMilliseconds, BuildSnapshot());
        }
    }

    private IReadOnlyList<Transform3DState> BuildSnapshot()
    {
        var entities = new Entity[_world.Size];
        _world.GetEntities(new QueryDescription(), entities.AsSpan());

        var states = new List<Transform3DState>(entities.Length);
        foreach (var entity in entities)
        {
            if (!_world.IsAlive(entity)) continue;
            var pos = _world.Get<Position3>(entity);
            var rot = _world.Get<Rotation3>(entity);
            var scale = _world.Get<Scale3>(entity);
            states.Add(new Transform3DState(
                _world.Get<RenderId>(entity).Id,
                pos.X, pos.Y, pos.Z,
                rot.Qx, rot.Qy, rot.Qz, rot.Qw,
                scale.X, scale.Y, scale.Z
            ));
        }

        return states;
    }

    public void Dispose()
    {
        _timer.Dispose();
        _systems.Dispose();
        World.Destroy(_world);
    }
}