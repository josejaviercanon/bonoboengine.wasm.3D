using Game.Engine.Config;
using Game.Engine.ECS;
using Xunit;

namespace Game.Tests;

public class Transform3DLifecycleTests
{
    private sealed class CapturingTransport : IRenderTransport<Transform3DRenderSignal>
    {
        private readonly object _sync = new();
        private readonly List<Transform3DRenderSignal> _history = new();

        public event Action<Transform3DRenderSignal>? OnSignal;

        public void Push(Transform3DRenderSignal signal)
        {
            lock (_sync)
            {
                _history.Add(signal);
            }

            OnSignal?.Invoke(signal);
        }

        public IReadOnlyList<Transform3DRenderSignal> History
        {
            get
            {
                lock (_sync)
                {
                    return _history.ToArray();
                }
            }
        }
    }

    private static async Task<IReadOnlyList<Transform3DRenderSignal>> WaitFor(
        CapturingTransport transport, Func<IReadOnlyList<Transform3DRenderSignal>, bool> predicate)
    {
        var deadline = DateTime.UtcNow.AddSeconds(5);
        while (DateTime.UtcNow < deadline)
        {
            var history = transport.History;
            if (predicate(history)) return history;
            await Task.Delay(10);
        }

        throw new TimeoutException("no matching signal observed within 5s");
    }

    [Fact]
    public async Task Spawn_And_Despawn_Flags_Cross_The_Buffer()
    {
        var transport = new CapturingTransport();
        var config = GameWorldConfig.Default;
        config.EntityCount = 2;

        using var sim = new Transform3DEcsSimulation(config, transport);

        await WaitFor(transport, h => h.Any(s =>
            s.States.Count == 2 && s.States.All(state => state.Lifecycle == EntityLifecycle3.Active)));

        sim.Spawn();

        var spawned = await WaitFor(transport, h => h.Any(s =>
            s.States.Count == 3 && s.States.Any(state => state.Lifecycle == EntityLifecycle3.Spawned)));
        var constructed = spawned.First(s => s.States.Count == 3);
        var newEntity = Assert.Single(constructed.States, state => state.Id == 2);
        Assert.Equal(EntityLifecycle3.Spawned, newEntity.Lifecycle);

        await WaitFor(transport, h => h.Any(s =>
            s.States.Count == 3 && s.States.All(state => state.Lifecycle == EntityLifecycle3.Active)));

        sim.Despawn();

        var destroyed = await WaitFor(transport, h => h.Any(s =>
            s.States.Count == 3 && s.States.Any(state => state.Lifecycle == EntityLifecycle3.Destroyed)));
        var tombstone = destroyed.Last(s => s.States.Count == 3);
        Assert.Contains(tombstone.States, state => state.Lifecycle == EntityLifecycle3.Destroyed);

        await WaitFor(transport, h => h.Any(s => s.States.Count == 2));
    }
}
