using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Game.Engine.Config;

/// <summary>
///     AOT-safe reader for <c>assets/config.bin</c>. Uses <see cref="MemoryMarshal"/>
///     overlays only (never <c>Marshal.StructureToPtr</c> / reflection) so the closure
///     stays Native AOT + trim clean on both hosts. The ABI is little-endian — the
///     browser-wasm heap and win-x64 are both LE, and anything else fails closed.
/// </summary>
public static class BinaryConfigReader
{
    public const int MaxEntityCount = 4096;

    public static bool TryRead(ReadOnlySpan<byte> bytes, out GameWorldConfig config, out string error)
    {
        config = default;
        error = string.Empty;

        if (!BitConverter.IsLittleEndian)
        {
            error = "config.bin ABI is little-endian; this platform is not.";
            return false;
        }

        var size = Unsafe.SizeOf<GameWorldConfig>();
        if (bytes.Length < size)
        {
            error = $"config.bin is {bytes.Length} bytes, expected at least {size}.";
            return false;
        }

        var candidate = MemoryMarshal.Read<GameWorldConfig>(bytes);

        if (candidate.Magic != GameWorldConfig.MagicValue)
        {
            error = $"config.bin magic 0x{candidate.Magic:X8} does not match 0x{GameWorldConfig.MagicValue:X8}.";
            return false;
        }

        if (candidate.Version != GameWorldConfig.CurrentVersion)
        {
            error = $"config.bin version {candidate.Version} is not supported (expected {GameWorldConfig.CurrentVersion}).";
            return false;
        }

        if (candidate.EntityCount is < 0 or > MaxEntityCount)
        {
            error = $"config.bin entity count {candidate.EntityCount} outside 0..{MaxEntityCount}.";
            return false;
        }

        if (!(IsFinite(candidate.GravityX) && IsFinite(candidate.GravityY) && IsFinite(candidate.GravityZ)))
        {
            error = "config.bin gravity contains a non-finite value.";
            return false;
        }

        if (!(candidate.ArenaHalfWidth > 0d && candidate.ArenaHalfHeight > 0d && candidate.ArenaHalfDepth > 0d))
        {
            error = "config.bin arena extents must be positive.";
            return false;
        }

        if (!(IsFinite(candidate.SpawnSpeedBase) && IsFinite(candidate.SpawnSpeedStep)))
        {
            error = "config.bin spawn speeds contain a non-finite value.";
            return false;
        }

        config = candidate;
        return true;
    }

    private static bool IsFinite(double value) => !(double.IsNaN(value) || double.IsInfinity(value));
}
