using System.Text.Json.Serialization;
using Game.Engine.ECS;
using Game.Engine.ECS.Asteroids;
using Game.Engine.ECS.Breakout;
using Game.Engine.ECS.Pacman;
using Game.Engine.ECS.Racer;
using Game.Engine.ECS.Snake;

namespace Game.Examples;

/// <summary>
/// Static catalog of every demo scene. <see cref="ExampleInfo.Id"/> is the source of
/// truth: the SSR payload embeds it. The Babylon.js game renderers (one per game)
/// arrive in a later iteration; the sims run headless in the meantime.
/// </summary>
public static class ExamplesCatalog
{
    public sealed record ExampleInfo(string Id, string Title, string Group, string SourceUrl);

    public static readonly IReadOnlyList<ExampleInfo> All = new List<ExampleInfo>
    {
        new("games/snake", "Snake", "Games", "https://github.com/JDStraughan/html5-snake"),
        new("games/tetris", "Tetris", "Games", "https://github.com/jakesgordon/javascript-tetris"),
        new("games/breakout", "Breakout", "Games", "https://github.com/jakesgordon/javascript-breakout"),
        new("games/asteroids", "Asteroids", "Games", "https://github.com/aesalazar/AsteroidsWasm"),
        new("games/racer", "Endless Race Runner", "Games", "https://github.com/jakesgordon/javascript-racer"),
        new("games/pacman", "Pac-Man", "Games", "https://github.com/josejaviercanon/bonoboengine.blazorwasm/tree/main/src/Temp/PacManBlazor"),
    };

    /// <summary>Group name that separates game scenes from plain engine demos.</summary>
    public const string GamesGroup = "Games";

    /// <summary>Game scenes only (sims always run; renderers land in a later iteration).</summary>
    public static IEnumerable<ExampleInfo> Games => All.Where(e => e.Group == GamesGroup);

    /// <summary>Non-game demos (removed with the PixiJS example catalogue).</summary>
    public static IEnumerable<ExampleInfo> Examples => All.Where(e => e.Group != GamesGroup);

    public static ExampleInfo? Find(string id) =>
        All.FirstOrDefault(e => string.Equals(e.Id, id, StringComparison.OrdinalIgnoreCase));

    public static IEnumerable<string> Groups => All.Select(e => e.Group).Distinct();
}

/// <summary>Serialized into the SSR payload for the client bootstrap script.
/// <c>Sprites</c>/<c>StreamUrl</c> are ECS-specific and null for plain demos.</summary>
public sealed record ExamplePayload(string ExampleId, string Title, string SourceUrl,
    IReadOnlyList<SpriteState>? Sprites = null, string? StreamUrl = null, SnakeScenePayload? Snake = null,
    TetrisScenePayload? Tetris = null, BreakoutScenePayload? Breakout = null, AsteroidsScenePayload? Asteroids = null,
    RacerScenePayload? Racer = null, PacmanScenePayload? Pacman = null);

/// <summary>Snake scene payload: initial snapshot, grid metrics and the live SSE stream URL.</summary>
public sealed record SnakeScenePayload(
    IReadOnlyList<SnakeSpriteState> Sprites,
    int Score,
    bool GameOver,
    bool Started,
    int GridWidth,
    int GridHeight,
    float CellSize,
    string StreamUrl);

/// <summary>Client input for the snake scene: a suggested direction the sim validates.</summary>
public sealed record SnakeInputRequest(string Direction);

/// <summary>Tetris scene payload: initial snapshot, grid metrics and the live SSE stream URL.</summary>
public sealed record TetrisScenePayload(
    IReadOnlyList<SpriteState> Sprites,
    int Score,
    int Rows,
    int Level,
    bool GameOver,
    bool Started,
    int GridWidth,
    int GridHeight,
    float CellSize,
    string StreamUrl);

/// <summary>Client input for the tetris scene: a suggested command (left/right/rotate/down) the sim validates.</summary>
public sealed record TetrisInputRequest(string Command);

/// <summary>Breakout scene payload: initial snapshot, court metrics and the live SSE stream URL.</summary>
public sealed record BreakoutScenePayload(
    IReadOnlyList<BreakoutSpriteState> Sprites,
    int Score,
    int Lives,
    int Level,
    bool GameOver,
    bool Started,
    float CourtWidth,
    float CourtHeight,
    float ChunkSize,
    string StreamUrl);

/// <summary>Asteroids scene payload: initial snapshot, court metrics and the live SSE stream URL.</summary>
public sealed record AsteroidsScenePayload(
    IReadOnlyList<AsteroidsSpriteState> Sprites,
    int Score,
    int HighScore,
    int Lives,
    int Level,
    bool GameOver,
    bool Started,
    float CourtWidth,
    float CourtHeight,
    string StreamUrl);

/// <summary>Pacman scene payload: maze topology, initial actors and live SSE stream.</summary>
public sealed record PacmanScenePayload(
    IReadOnlyList<PacmanSpriteState> Sprites,
    IReadOnlyList<string> MazeRows,
    int Score,
    int Lives,
    int Level,
    int PelletsRemaining,
    bool GameOver,
    bool Started,
    int MazeWidth,
    int MazeHeight,
    float CellSize,
    string StreamUrl,
    int FruitItem = 0,
    bool FruitVisible = false);

/// <summary>Client input suggestion for Pacman; ECS validates direction on fixed tick.</summary>
public sealed record PacmanInputRequest(string Direction);
