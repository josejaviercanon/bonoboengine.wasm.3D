using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using Game.Engine.Config;
using Xunit;

namespace Game.Tests;

public class BinaryConfigTests
{
    private static byte[] Encode(in GameWorldConfig config)
    {
        var bytes = new byte[Unsafe.SizeOf<GameWorldConfig>()];
        MemoryMarshal.Write(bytes, in config);
        return bytes;
    }

    [Fact]
    public void Config_Round_Trips_Through_Binary()
    {
        var config = new GameWorldConfig
        {
            Magic = GameWorldConfig.MagicValue,
            Version = GameWorldConfig.CurrentVersion,
            EntityCount = 7,
            GravityX = 1.5,
            GravityY = -9.81,
            GravityZ = -0.25,
            ArenaHalfWidth = 30,
            ArenaHalfHeight = 12,
            ArenaHalfDepth = 40,
            ArenaFloorY = -3,
            SpawnSpeedBase = 6,
            SpawnSpeedStep = 2,
        };

        Assert.True(BinaryConfigReader.TryRead(Encode(config), out var parsed, out var error), error);
        Assert.Equal(config.EntityCount, parsed.EntityCount);
        Assert.Equal(config.GravityX, parsed.GravityX);
        Assert.Equal(config.GravityY, parsed.GravityY);
        Assert.Equal(config.GravityZ, parsed.GravityZ);
        Assert.Equal(config.ArenaHalfWidth, parsed.ArenaHalfWidth);
        Assert.Equal(config.ArenaHalfHeight, parsed.ArenaHalfHeight);
        Assert.Equal(config.ArenaHalfDepth, parsed.ArenaHalfDepth);
        Assert.Equal(config.ArenaFloorY, parsed.ArenaFloorY);
        Assert.Equal(config.SpawnSpeedBase, parsed.SpawnSpeedBase);
        Assert.Equal(config.SpawnSpeedStep, parsed.SpawnSpeedStep);
    }

    [Fact]
    public void Config_Header_Is_Locked_To_Twenty_Four_Bytes()
    {
        // uint magic + uint version + int entityCount + int reserved.
        Assert.Equal(16, Unsafe.SizeOf<GameWorldConfig>() - 9 * sizeof(double));
    }

    [Fact]
    public void Config_Defaults_Are_Valid()
    {
        Assert.True(BinaryConfigReader.TryRead(Encode(GameWorldConfig.Default), out _, out var error), error);
    }

    [Fact]
    public void Config_Rejects_Short_Buffer()
    {
        Assert.False(BinaryConfigReader.TryRead(new byte[8], out _, out var error));
        Assert.Contains("expected at least", error);
    }

    [Fact]
    public void Config_Rejects_Bad_Magic()
    {
        var bytes = Encode(GameWorldConfig.Default);
        bytes[0] ^= 0xFF;
        Assert.False(BinaryConfigReader.TryRead(bytes, out _, out var error));
        Assert.Contains("magic", error);
    }

    [Fact]
    public void Config_Rejects_Unknown_Version()
    {
        var config = GameWorldConfig.Default;
        config.Version = 99;
        Assert.False(BinaryConfigReader.TryRead(Encode(config), out _, out var error));
        Assert.Contains("version", error);
    }

    [Fact]
    public void Config_Rejects_Absurd_Entity_Count()
    {
        var config = GameWorldConfig.Default;
        config.EntityCount = BinaryConfigReader.MaxEntityCount + 1;
        Assert.False(BinaryConfigReader.TryRead(Encode(config), out _, out var error));
        Assert.Contains("entity count", error);
    }
}
