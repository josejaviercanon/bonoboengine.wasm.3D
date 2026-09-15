using System.Runtime.InteropServices;

namespace Game.Engine.Config;

/// <summary>
///     Blittable header + scalar block of the binary world configuration
///     (<c>assets/config.bin</c>). Every field is a 4- or 8-byte little-endian
///     primitive so the struct can be overlaid directly on the file bytes with
///     <see cref="BinaryConfigReader"/> — no parser allocations, no reflection.
///     Entity records (if any) follow the header; version 1 ships the header only.
/// </summary>
[StructLayout(LayoutKind.Sequential, Pack = 1)]
public struct GameWorldConfig
{
    /// <summary>ASCII "BNBO" read as a little-endian uint32.</summary>
    public const uint MagicValue = 0x4F424E42;

    public const uint CurrentVersion = 1;

    public uint Magic;
    public uint Version;
    public int EntityCount;
    public int Reserved;

    public double GravityX;
    public double GravityY;
    public double GravityZ;

    public double ArenaHalfWidth;
    public double ArenaHalfHeight;
    public double ArenaHalfDepth;
    public double ArenaFloorY;

    public double SpawnSpeedBase;
    public double SpawnSpeedStep;

    /// <summary>Deterministic fallback matching the pre-config engine defaults.</summary>
    public static GameWorldConfig Default => new()
    {
        Magic = MagicValue,
        Version = CurrentVersion,
        EntityCount = 12,
        Reserved = 0,
        GravityX = 0d,
        GravityY = -9.81d,
        GravityZ = 0d,
        ArenaHalfWidth = 45d,
        ArenaHalfHeight = 20d,
        ArenaHalfDepth = 45d,
        ArenaFloorY = -4d,
        SpawnSpeedBase = 8d,
        SpawnSpeedStep = 4d,
    };
}
