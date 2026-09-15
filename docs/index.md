# Bonobo Blazorwasm Engine — The Stack

**This file is the source of truth for the engine's stack, architecture, and project structure.** It is maintained to match the repository; when code and prose disagree, this file (kept current) wins. Verified API facts live in `docs/ai-agents/codebase-truth.md`; build state and agent workflow live in `AGENTS.md`. `README.md` mirrors this file for GitHub visitors.

---

## Mission

Computing your entire game logic inside C#. It allows you to build a single, authoritative simulation engine that runs client-side inside .NET MAUI or Blazor today, and can be dropped directly onto a dedicated .NET Linux server tomorrow for authoritative multiplayer.

To make this architecture work without destroying performance, you must isolate the **Simulation Layer (C#)** from the **Presentation Layer (Babylon.js/Tailwind)**.

Here is the architectural blueprint to achieve this zero-duplicate-work setup.

## 🧱 The Authoritative C# Architecture

To ensure your C# code can run both on the client (MVP) and the server (future), your core logic must have zero dependencies on UI libraries, MAUI, or Blazor.

You should split your codebase into three distinct layers:

```
+---------------------------------------------------------------------------------+
|                    1. SHARED CORE ENGINE (C# Class Library)                     |
|  - Holds Game State (Entities, Grid, Stats)     - Runs Simulation Ticks         |
|  - Command/Event System (Inputs, Actions)       - Pure C# Logic (AOT Friendly)  |
+---------------------------------------------------------------------------------+
                                       |
                   +-------------------+-------------------+
                   |                                       |
+--------------------------------------+   +--------------------------------------+
|        2. PRESENTATION BRIDGE        |   |       3. FUTURE SERVER HOSTER        |
|  - Non-Blazor browser-wasm host      |   |  - ASP.NET Core Minimal API / WebSockets
|  - [JSImport]/[JSExport] + shared    |   |  - Runs the exact same Core Engine   |
|    memory (Float64 heap view)        |   |  - Verifies incoming client commands |
|  - WinUI 3 + WebView2 desktop host   |   |                                      |
|    (native AOT, shared buffers)      |   |                                      |
+--------------------------------------+   +--------------------------------------+
```

1. **The Core Simulation Engine (Pure C#)** — a standard .NET Class Library. It knows absolutely nothing about graphics, rendering, or browsers.
   - *State Management:* manages coordinates, stats, pathfinding matrices, and entity maps.
   - *The Deterministic Tick:* runs the Arch ECS systems each fixed step (e.g., `MovementSystem`, `ColorSystem`) and emits one **batched** render signal (`EcsRenderSignal`) per interval — not one event per entity — so the presentation layer mirrors authoritative state without per-frame interop. A `ProcessCommand` command pattern is the planned input boundary.
2. **The Presentation Layer (Babylon.js v9 + Tailwind)** — a pure mirror of your C# state.
   - *Tailwind UI:* DOM overlays for menus, inventories, and HUDs.
   - *Babylon.js Canvas:* reads transform state from the pinned shared-memory buffer (`Float64Array` over the WASM heap in the browser and over a WebView2 shared buffer on desktop) and updates meshes/cameras per render frame — no per-entity interop calls.

### ⚠️ The Performance Gold Rule: Avoid JSON Serialization

Polling C# from JavaScript every frame, or serializing the whole state tree per frame, will reduce your game's frame rate down to single digits. You **must** use a **Push-Based Batched Signal** approach: the engine emits one batched render signal per fixed tick into a pinned `GCHandle` buffer; JS reads it through a typed-array view (WASM heap) or the WebView2 shared-buffer mapping.

- ❌ **Bad (Polling):** JS loops at display Hz and calls C# via interop — "Where is everyone right now?" C# serializes 500 characters into JSON and passes it back.
- ✅ **Good (Batched Delta Push):** the C# engine finishes a tick and writes one batched snapshot into shared memory; JS projects a `Float64Array` over the same memory and updates only the meshes that changed. Zero copies, no JSON, no reflection.

**2.1. UI:** keep the presentation layer thin. Use Tailwind CSS for menus, inventories, and HUD. Babylon.js owns the 3D canvas; a modular, object-oriented vanilla TypeScript file (`Frontend/game.ts`) initializes the engine and maps incoming C# signals to mesh transforms.

## 🧬 Engine Topology: Simulation ↔ Presentation ↔ Render

The Authoritative C# Architecture above splits the **Presentation Bridge** into two further layers at runtime, yielding a three-layer topology. C# is the sole authority; Babylon.js is a pure mirror that interpolates and renders.

```
C# AUTHORITATIVE WORLD          Arch ECS + BepuPhysics2 (3D rigid-body authority)
        │  fixed timestep → RenderSnapshot (Tick, Pos, Velocity) → pinned buffer
        ▼
BABYLON.JS v9                   meshes, thin instances, camera, particles, GPU
```

- **Never** move simulation back-and-forth through JS interop every frame. Cross the boundary only via batched render snapshots.
- **Domain ownership:** C# owns game rules, collision, character controllers, deterministic simulation. Babylon.js owns mesh transforms, camera control, interpolation, particles.
- **Bridge status:** zero-copy shared memory pipeline implemented on both hosts: C# writes batched signals into a pinned `GCHandle` buffer (`PinnedRenderBuffer<T>`) → the browser host reads the `Float64Array` over the WASM heap via `[JSImport] notifyRender` (`Game.Wasm/wwwroot/js/wasm-interop.js`); the desktop host copies the same span into a `CoreWebView2SharedBuffer` and posts it via `PostSharedBufferToScript` (`Game.WinApp`, see `docs/architecture/desktop-webview2.md`). Entity lifecycle (spawn/destroy) rides in the same record as a flag (`Transform3DState.Lifecycle`, stride 12) so mesh creation/disposal needs no per-entity interop. Client interpolation: `P_render = P_prev + (P_curr − P_prev) × α`. Implementation guide (math, per-entity `InterpState` buffer): `docs/architecture/render-interpolation.md`.
- **Physics:** BepuPhysics2 = authoritative 3D rigid-body simulation (C# ECS loop, vendored at `src/bepuphysics2`, wired into `Game.Engine` and used by `AsteroidsSimulation` as a 2D-plane world). The old Box2D.NET backend and box2d3-wasm presentation physics were removed.
- **Skeletal animation:** glTF (`.glb`) is the asset contract, not the ECS architecture — two decoupled pipelines (authoring: AI+Blender→`.glb`; runtime: `.glb`→importer→ECS→Babylon.js); the animation state machine belongs to the ECS.
- **Layout sync (zero-copy guardrails):** the C# signal layout (`SignalBufferLayout` + `SignalBufferEncoders` in `Game.Engine.ECS`) and the TypeScript decoders are kept in lockstep by `src/Game.Engine.Generators` — a Roslyn analyzer (`BNOBO001` stride mismatch, `BNOBO002` unsupported type, `BNOBO003` wide integers) plus a source generator that emits `GeneratedSignalLayout` (`*Stride`, `*ScalarSize`, `*ByteLength`) + a boot-time `[ModuleInitializer]` static assert and writes the generated `src/Game.UI/Frontend/scenes/generated/signalLayout.ts`. Mark every render-state struct with `[TypeScriptExport(elementStride)]` and its `Precision` (`ScalarPrecision.Float64` default — all production signals are pure 64-bit; position + quaternion + scale + lifecycle flag, stride 12 for the 3D transform layout).

Full matrices (ecosystem integration, implementation status, packages) live in `docs/architecture/topology.md`. Decisions: `docs/adr/`.

**Single-player local is the default build.** `SINGLE_PLAYER_LOCAL` is the default C# compilation constant; `npm run build` produces a local-buffer bundle (`__RENDER_SOURCE__='local-buffer'`) with zero HTTP client code. Multiplayer is opt-in: build with `npm run build:web` + `/p:IsMultiplayer=true`.

## 🛠️ Step-by-Step Blueprint for the MVP

### Step 1: The Authoritative C# ECS Simulation

The authoritative simulation is an Arch ECS world in `src/Game.Engine` (not a `Dictionary` of entities). Components are zero-logic `[Component]` structs; systems are `[Query]`-generated. It ticks at 60 Hz and emits one **batched** `EcsRenderSignal` per second (throttled so the render pipeline isn't flooded). `Snapshot()` returns the initial state for SSR.

```csharp
// src/Game.Engine/ECS/Components.cs — pure-data structs
[Component] public struct Position    { public float X; public float Y; }
[Component] public struct Velocity    { public float X; public float Y; }
[Component] public struct SpriteColor { public byte R; public byte G; public byte B; }
[Component] public struct RenderId    { public int Id; }   // stable id → client sprite

// src/Game.Engine/ECS/EcsSimulation.cs — the authoritative tick
[TypeScriptExport(6)] // zero-copy float-stride marker (Game.Engine.Generators validates it)
public record struct SpriteState(int Id, float X, float Y, byte R, byte G, byte B);
public sealed record EcsRenderSignal(long Seq, int EntityCount, double TickMs, IReadOnlyList<SpriteState> Sprites);

public sealed class EcsSimulation : IDisposable
{
    public event Action<EcsRenderSignal>? OnRenderSignal;   // batched delta → host
    public IReadOnlyList<SpriteState> Snapshot() { /* …initial SSR state… */ }
    // 60 Hz Timer → MovementSystem + ColorSystem → emits EcsRenderSignal @1s
}
```

No per-entity `EntityMoved` events and no `IJSRuntime` calls from the engine: state leaves the simulation only as a batched render signal (the "Performance Gold Rule"; refines this toward `TransformSnapshot` + shared-memory).

### Step 2: The Babylon.js Scene (Zero-Copy Buffer Consumer)

`src/Game.UI/Frontend/game.ts` hosts the Babylon.js demo-balls scene (`initGame` — FreeCamera + collisions, CannonJS physics arena, amiga-textured spheres, shadow-casting directional light). The game examples and launch menu were removed; future simulations will map batched float64 snapshots from the pinned buffer onto mesh transforms via the shared-memory bridge. No game rules or boundary checks in JS.

The zero-copy shared memory pipeline (ADR-008) replaces the old SSE/JSON bridge: batched float64 snapshots → pinned `GCHandle` buffer → `Float64Array` over WASM heap → client interpolation (ADR-003). The legacy SSE consumer blueprint below is kept for historical context only.

```typescript
// src/Game.UI/Frontend/scenes/ecsSprites.ts (condensed)
interface EcsSpriteState  { id: number; x: number; y: number; r: number; g: number; b: number; }
interface EcsRenderSignal { seq: number; entityCount: number; tickMs: number; sprites: EcsSpriteState[]; }

// Initial positions come from the SSR payload → sprites render before the first tick.
const sprites = new Map<number, Sprite>();
for (const state of params.sprites ?? []) {
    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5);
    sprite.position.set(state.x, state.y);
    sprite.tint = (state.r << 16) | (state.g << 8) | state.b;
    app.stage.addChild(sprite);
    sprites.set(state.id, sprite);
}

// Stream authoritative deltas over SSE — never poll C# per frame.
const source = new EventSource(params.streamUrl);
source.addEventListener('sprite-move', (event) => {
    const signal = JSON.parse(event.data) as EcsRenderSignal;
    for (const state of signal.sprites) {
        const sprite = sprites.get(state.id);
        if (sprite && !sprite.destroyed) sprite.position.set(state.x, state.y);
    }
});
source.onerror = () => source.close();
```

This is the deprecated SSE/JSON bridge (removed). The zero-copy shared memory pipeline now replaces it: batched `TransformSnapshot` → pinned `GCHandle` buffer → `Float64Array` over WASM heap → client interpolation.

## 🚀 Future-Proofing for Authoritative Multiplayer

By designing your MVP this way, moving to a multiplayer model becomes a structural drop-in change:

- You pluck your Shared Core Engine project out of the client build and compile it into a headless ASP.NET Core console application hosted on Linux.
- Instead of your client UI executing commands directly against a local `GameSimulation` instance, your client UI serializes the `MoveCommand` and shoots it over a SignalR or WebSocket connection.
- The server runs the command through the exact same C# simulation code, processes the ticks, and broadcasts the batched `EcsRenderSignal` across the network to all connected clients.
- Your Babylon.js setup handles the network event exactly like it handled the local event during the MVP phase.

## Sourced Ecosystem Libraries & Starting Points

The architectural stack uses specialized, lightweight libraries designed for maximum performance, data serialization, and strict zero-allocation boundaries:

- **Game State Engine (Arch ECS):** a high-performance, ultra-lightweight C# Archetype Entity Component System. It avoids rigid class inheritance and allows you to process game world calculations (e.g., matching a parsed Town Entity to its structural Garrison Army Entities) inside structured, flat database-like chunks.
- **AOT-Friendly Persistence Loop (.NET System.Text.Json Source Generators):** essential for saving/loading mechanics. Using `JsonSourceGenerationOptions` forces compilation to produce specialized metadata ahead-of-time (Native AOT-safe). This ensures fast, allocation-free serialization when passing structural map files, flat JSON configs, and delta-state frames across the .NET-to-JavaScript bridge.
- **Canvas & Presentation Layer (Babylon.js v9):** a 3D WebGL2/WebGPU rendering engine (`@babylonjs/core`). Mesh pools, thin instances, cameras, lights, and PBR materials render the authoritative C# state; the zero-copy float64 bridge feeds transforms without per-entity interop.
- **UI Layout & Theme Canvas (Tailwind CSS):** handles responsive HUDs, non-overlapping contextual menus, popups, inventory windows, and system options cleanly using standard HTML/CSS.

## Specialized MCP Servers & Knowledge Bases

When working with an MCP-capable AI agent:

- **`docs/game-development`** — structured game design patterns, structural gamedev guides, and documentation contexts aligned with this engine's stack (Arch ECS simulation + Babylon.js presentation + Tailwind UI). They keep the agent anchored to professional game-loop conventions. Is the curated, engine-agnostic subset (concepts, programming, game design, project management, AI workflow).
  - `docs/game-entity-component-system/` mirrors the toolkit reorganized into `guides/` + `reference/` and carries the Bonobo-specific ECS rules (`bonobo-ECS-rules.md`).
- **`net-microsoft-documentation` MCP server:** connects to Microsoft Learn via streamable HTTP, letting agents search documentation, fetch complete articles, and search code samples — trusted, up-to-date Microsoft knowledge ([source](https://learn.microsoft.com/en-us/training/support/mcp)).

## AI Agent Guidelines & System Instructions

When generating code, refactoring, or adding features in this repository, AI coding agents must adhere strictly to the following rules. (Full generation do/don't lists and game-dev workflow rules live in `AGENTS.md`; verified API facts live in `docs/ai-agents/codebase-truth.md`.)

### 1. Entity Component System (Arch ECS) Rules

- **Components as Data Structs:** components **must** be zero-logic, public C# `struct` value types for cache locality (e.g., `public struct Position { public Vector2 Value; }`). Never use classes or put methods inside ECS components.
- **Systems as Logic Processors:** systems must be stateless or process data purely through `QueryDescription` iterations or `Arch.Systems.BaseSystem` implementations.
- **Safe Structural Modifications:** entity creation, destruction, and component addition/removal must happen via Arch command buffers or outside query loops to prevent invalidating memory chunks during iteration. Never mutate structure mid-query.

## Asset Pipeline Workflow

- **Raw game assets** (models, environments, textures, audio samples) live in `src/Game.UI/wwwroot/assets/` and are copied **verbatim** into every host by `Game.UI/Game.UIAssets.targets` — no npm packaging, no Rollup hashing, so C#-facing paths like `assets/level1.glb` never change between dev and publish. The only generated file in that folder is `config.bin`.
- **Binary world config:** `config/world.json` (repo root) → `dotnet run --project src/Game.ConfigBuilder` → `src/Game.UI/wwwroot/assets/config.bin` (magic `BNBO`, version 1). Both hosts load the same bytes: the browser `main.mjs` fetches them and calls the `LoadConfiguration` `[JSExport]`; WinApp reads them from `wwwroot/assets` at startup. Missing/invalid file = `GameWorldConfig.Default` (engine falls back, it is not fatal). Reader is `Game.Engine.Config.BinaryConfigReader` (`MemoryMarshal` overlay, AOT-safe).
- **Dev loop:** `npm run dev` (in `src/Game.UI`) runs `dotnet watch`, the Vite watcher and the Tailwind watcher, and mirrors the asset folders into `Game.Wasm/wwwroot` on change — see `docs/architecture/dev-workflow.md`.
- Assets naming: lowercase with underscores, prefix by category (`ui_`, `sfx_`, `bgm_`, `vfx_`, `tile_`, `char_`, `env_`), frame/variant numbers as suffixes.
- Normalize audio to a consistent dB target; music loops must have clean loop points tested in-engine.
- Detailed art/audio pipeline rules: `docs/game-development/ai-workflow/gamedev-rules.md` and `docs/game-development/project-management/P5_art_pipeline.md` / `P6_audio_pipeline.md`.
