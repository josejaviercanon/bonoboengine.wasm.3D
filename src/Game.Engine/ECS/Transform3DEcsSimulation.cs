using System.Diagnostics;
using Arch.Core;
using Arch.Systems;
using Game.Engine.Config;
using Game.Engine.ECS.Systems;

namespace Game.Engine.ECS;

/// <summary>
///     ECS-authoritative 3D demo simulation. Owns an Arch ECS world of
///     <see cref="Transform3DState"/> entities (position + quaternion + scale + lifecycle),
///     ticks the systems at a fixed 60 Hz and pushes a
///     <see cref="Transform3DRenderSignal"/> every tick through the
///     <see cref="IRenderTransport{TSignal}"/> seam into the pinned shared-memory
///     "transform3d" buffer. Deterministic: seeded fixed velocities, no random
///     allocation, single-threaded.
///
///     Spawn/despawn commands are queued by the host (low-frequency, primitive-only) and
///     applied at the top of the tick — never inside an Arch query. Destroyed entities are
///     emitted one final time with <see cref="EntityLifecycle3.Destroyed"/> so the Babylon
///     side can dispose the mesh, then removed after the snapshot is encoded.
/// </summary>
public sealed class Transform3DEcsSimulation : IDisposable
{
    public const double TickIntervalSeconds = 1.0 / 60.0;

    private readonly World _world;
    private readonly Group<double> _systems;
    private readonly Timer _timer;

    private readonly object _sync = new();
    private long _seq;
    private int _nextRenderId;

    private readonly float _arenaHalfWidth;
    private readonly float _arenaHalfHeight;
    private readonly float _arenaHalfDepth;
    private readonly float _arenaFloorY;
    private readonly double _spawnSpeedBase;
    private readonly double _spawnSpeedStep;
    private readonly int _initialEntityCount;

    private readonly Dictionary<int, Entity> _entityByRenderId = new();
    private readonly Queue<Entity> _pendingDespawns = new();
    private int _pendingSpawns;

    private readonly IRenderTransport<Transform3DRenderSignal> _renderTransport;

    public Transform3DEcsSimulation(
        GameWorldConfig? config = null,
        IRenderTransport<Transform3DRenderSignal>? renderTransport = null)
    {
        var world = config ?? GameWorldConfig.Default;
        _arenaHalfWidth = (float)world.ArenaHalfWidth;
        _arenaHalfHeight = (float)world.ArenaHalfHeight;
        _arenaHalfDepth = (float)world.ArenaHalfDepth;
        _arenaFloorY = (float)world.ArenaFloorY;
        _spawnSpeedBase = world.SpawnSpeedBase;
        _spawnSpeedStep = world.SpawnSpeedStep;
        _initialEntityCount = world.EntityCount;

        _renderTransport = renderTransport ?? new ServerRenderTransport<Transform3DRenderSignal>();

        _world = World.Create();
        for (var i = 0; i < _initialEntityCount; i++)
        {
            SpawnEntityLocked();
        }

        _systems = new Group<double>(
            "Transform3D",
            new MoveBounce3DSystem(_world,
                -_arenaHalfWidth, _arenaHalfWidth,
                _arenaFloorY, _arenaFloorY + _arenaHalfHeight,
                -_arenaHalfDepth, _arenaHalfDepth),
            new SpinSystem(_world),
            new ScalePulseSystem(_world)
        );
        _systems.Initialize();

        _timer = new Timer(Tick, null, TimeSpan.Zero, TimeSpan.FromSeconds(TickIntervalSeconds));
    }

    /// <summary>Queues one entity for creation on the next tick.</summary>
    public void Spawn()
    {
        lock (_sync)
        {
            _pendingSpawns++;
        }
    }

    /// <summary>Queues the most recently spawned alive entity for removal on the next tick.</summary>
    public void Despawn()
    {
        lock (_sync)
        {
            var found = false;
            var maxId = int.MinValue;
            var selected = default(Entity);

            foreach (var (renderId, entity) in _entityByRenderId)
            {
                if (renderId <= maxId) continue;
                maxId = renderId;
                selected = entity;
                found = true;
            }

            if (!found) return;

            _entityByRenderId.Remove(maxId);
            _pendingDespawns.Enqueue(selected);
        }
    }

    private void Tick(object? _)
    {
        Transform3DRenderSignal? signal;
        lock (_sync)
        {
            ApplyLifecycleCommandsLocked();
            signal = BuildSignalLocked();
            FinalizeLifecycleLocked();
        }

        if (signal is null) return;
        _renderTransport.Push(signal);
    }

    private void ApplyLifecycleCommandsLocked()
    {
        while (_pendingDespawns.Count > 0)
        {
            var entity = _pendingDespawns.Dequeue();
            if (!_world.IsAlive(entity)) continue;
            _world.Set(entity, new RenderLifecycle3 { State = EntityLifecycle3.Destroyed });
        }

        var spawns = _pendingSpawns;
        _pendingSpawns = 0;
        for (var i = 0; i < spawns; i++)
        {
            SpawnEntityLocked();
        }
    }

    private void FinalizeLifecycleLocked()
    {
        List<int>? destroyed = null;

        foreach (var (renderId, entity) in _entityByRenderId)
        {
            if (!_world.IsAlive(entity))
            {
                (destroyed ??= new List<int>()).Add(renderId);
                continue;
            }

            if (!_world.Has<RenderLifecycle3>(entity)) continue;

            var lifecycle = _world.Get<RenderLifecycle3>(entity);
            if (lifecycle.State == EntityLifecycle3.Destroyed)
            {
                _world.Destroy(entity);
                (destroyed ??= new List<int>()).Add(renderId);
            }
            else if (lifecycle.State == EntityLifecycle3.Spawned)
            {
                lifecycle.State = EntityLifecycle3.Active;
                _world.Set(entity, lifecycle);
            }
        }

        if (destroyed is null) return;
        foreach (var renderId in destroyed)
        {
            _entityByRenderId.Remove(renderId);
        }
    }

    private void SpawnEntityLocked()
    {
        var id = _nextRenderId++;
        var speed = (float)(_spawnSpeedBase + id % 4 * _spawnSpeedStep);
        var vx = speed * ((id & 1) == 0 ? 1f : -1f);
        var vz = speed * (((id >> 1) & 1) == 0 ? 1f : -1f) * 0.7f;

        var entity = _world.Create(
            new Position3(
                -_arenaHalfWidth * 0.5f + (id * 7.5f % (_arenaHalfWidth * 0.9f)),
                _arenaFloorY + 2f + (id % 3) * 5f,
                -_arenaHalfDepth * 0.5f + (id * 11f % (_arenaHalfDepth * 0.9f))),
            new Velocity3(vx, 2f + id % 5, vz),
            new Rotation3(0f, 0f, 0f, 1f),
            new AngularVelocity3(
                0.5f + (id % 3) * 0.4f,
                0.8f + (id % 4) * 0.3f,
                0.3f + ((id >> 1) % 3) * 0.5f),
            new Scale3(1f, 1f, 1f),
            new RenderId(id),
            new RenderLifecycle3 { State = EntityLifecycle3.Spawned });

        _entityByRenderId[id] = entity;
    }

    /// <summary>Runs one simulation step and returns the batched 3D transform signal.</summary>
    private Transform3DRenderSignal BuildSignalLocked()
    {
        var dt = TickIntervalSeconds;
        var stopwatch = Stopwatch.StartNew();
        _systems.BeforeUpdate(in dt);
        _systems.Update(in dt);
        _systems.AfterUpdate(in dt);
        stopwatch.Stop();

        _seq++;
        return new Transform3DRenderSignal(_seq, _world.Size, stopwatch.Elapsed.TotalMilliseconds, BuildSnapshotLocked());
    }

    private IReadOnlyList<Transform3DState> BuildSnapshotLocked()
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
            var lifecycle = _world.Has<RenderLifecycle3>(entity)
                ? _world.Get<RenderLifecycle3>(entity).State
                : EntityLifecycle3.Active;

            states.Add(new Transform3DState(
                _world.Get<RenderId>(entity).Id,
                pos.X, pos.Y, pos.Z,
                rot.Qx, rot.Qy, rot.Qz, rot.Qw,
                scale.X, scale.Y, scale.Z,
                lifecycle
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
