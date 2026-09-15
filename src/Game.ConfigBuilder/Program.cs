using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text.Json;
using Game.Engine.Config;

namespace Game.ConfigBuilder;

internal static class Program
{
    private static int Main(string[] args)
    {
        var repoRoot = FindRepoRoot() ?? Directory.GetCurrentDirectory();
        var inputPath = args.Length > 0 ? Path.GetFullPath(args[0]) : Path.Combine(repoRoot, "config", "world.json");
        var outputPath = args.Length > 1
            ? Path.GetFullPath(args[1])
            : Path.Combine(repoRoot, "src", "Game.UI", "wwwroot", "assets", "config.bin");

        if (!File.Exists(inputPath))
        {
            Console.Error.WriteLine($"world spec not found: {inputPath}");
            return 1;
        }

        WorldSpec spec;
        try
        {
            spec = JsonSerializer.Deserialize(File.ReadAllText(inputPath), SpecJsonContext.Default.WorldSpec)
                   ?? throw new InvalidOperationException("empty world spec");
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"failed to parse {inputPath}: {ex.Message}");
            return 1;
        }

        var config = new GameWorldConfig
        {
            Magic = GameWorldConfig.MagicValue,
            Version = GameWorldConfig.CurrentVersion,
            EntityCount = spec.EntityCount,
            GravityX = spec.Gravity.X,
            GravityY = spec.Gravity.Y,
            GravityZ = spec.Gravity.Z,
            ArenaHalfWidth = spec.Arena.HalfWidth,
            ArenaHalfHeight = spec.Arena.HalfHeight,
            ArenaHalfDepth = spec.Arena.HalfDepth,
            ArenaFloorY = spec.Arena.FloorY,
            SpawnSpeedBase = spec.SpawnSpeed.Base,
            SpawnSpeedStep = spec.SpawnSpeed.Step,
        };

        var bytes = new byte[Unsafe.SizeOf<GameWorldConfig>()];
        MemoryMarshal.Write(bytes, in config);

        Directory.CreateDirectory(Path.GetDirectoryName(outputPath)!);
        File.WriteAllBytes(outputPath, bytes);

        if (!BinaryConfigReader.TryRead(bytes, out var verify, out var error))
        {
            Console.Error.WriteLine($"generated config failed verification: {error}");
            return 1;
        }

        Console.WriteLine(
            $"config.bin written: {verify.EntityCount} entities, gravity ({verify.GravityX}, {verify.GravityY}, {verify.GravityZ}), {bytes.Length} bytes -> {outputPath}");
        return 0;
    }

    private static string? FindRepoRoot()
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);
        while (directory is not null)
        {
            if (File.Exists(Path.Combine(directory.FullName, "bonoboWebGame.slnx")))
                return directory.FullName;
            directory = directory.Parent;
        }

        return null;
    }
}
