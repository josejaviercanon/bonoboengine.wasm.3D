using System.Text.Json.Serialization;

namespace Game.ConfigBuilder;

internal sealed class WorldSpec
{
    public int EntityCount { get; set; } = 12;
    public VectorSpec Gravity { get; set; } = new();
    public ArenaSpec Arena { get; set; } = new();
    public SpawnSpeedSpec SpawnSpeed { get; set; } = new();
}

internal sealed class VectorSpec
{
    public double X { get; set; }
    public double Y { get; set; } = -9.81d;
    public double Z { get; set; }
}

internal sealed class ArenaSpec
{
    public double HalfWidth { get; set; } = 45d;
    public double HalfHeight { get; set; } = 20d;
    public double HalfDepth { get; set; } = 45d;
    public double FloorY { get; set; } = -4d;
}

internal sealed class SpawnSpeedSpec
{
    public double Base { get; set; } = 8d;
    public double Step { get; set; } = 4d;
}

[JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
[JsonSerializable(typeof(WorldSpec))]
internal partial class SpecJsonContext : JsonSerializerContext;
