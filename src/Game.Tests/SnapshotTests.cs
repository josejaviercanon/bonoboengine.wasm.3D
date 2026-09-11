using Game.Engine.ECS;
using Xunit;

namespace Game.Tests;

/// <summary>Unit tests for the SSR-facing snapshots of both simulations.</summary>
public class SnapshotTests
{
    [Fact]
    public void EcsSnapshot_Has_Ten_Sprites_With_Unique_RenderIds()
    {
        using var sim = new EcsSimulation();
        var snapshot = sim.Snapshot();

        Assert.Equal(10, snapshot.Count);
        Assert.Equal(10, snapshot.Select(s => s.Id).Distinct().Count());
        Assert.All(snapshot, s =>
        {
            Assert.InRange(s.X, 0f, sim.Width);
            Assert.InRange(s.Y, 0f, sim.Height);
        });
    }

    
}
