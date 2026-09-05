# Agent Directives: bonoboengine.wasm.3D Architecture

**Directive:** Agents must never implement per-entity draw calls, individual DOM queries, or inefficient JSON string serialization loops for 3D rendering. All high-frequency 3D transformation data must utilize zero-copy memory buffers, mapping pinned C# transform structures directly to Babylon.js mesh transforms via a single `Float32Array` view over the WebAssembly heap.

**Directive:** Agents must never serialize entity transform states into JSON, UTF-8 strings, or managed array clones during high-frequency execution loops. All spatial coordinates, velocities, and rotation data must cross the WASM-JS boundary using raw, pinned memory pointers or shared memory buffers exported by C# interop.

---

## Project Context

* **Language:** C# 14 / .NET
* **Framework:** .NET MAUI / WASM Native AOT
* **ECS Backend:** Arch ECS (Pure C# zero-allocation component architecture)
* **Physics Backend:** `BepuPhysics2` (Authoritative 3D simulation loop, deterministic single-threaded on the browser-wasm host)
* **Render Frontend:** Babylon.js v8 (3D WebGL2/WebGPU canvas renderer)
* **UI Overlay:** Tailwind CSS + Vite + TypeScript
* **Target Environment:** Native AOT / WebAssembly (WASM)

---

## Architectural Rules

### AOT_STRICT_COMPLIANCE

* **Description:** Production binaries must compile via Native AOT. Zero runtime reflection or dynamic IL generation is permitted outside of `#if DEBUG`.
* **Enforcement:** Wrap all `System.Reflection` usage strictly inside `#if DEBUG` ... `#endif` blocks or leverage C# source generators.

### PHYSICS_MEMORY_STRICT

* **Description:** `BepuPhysics2` simulation loops must maintain strict memory hygiene to prevent garbage collection pressure and ensure deterministic execution.
* **Enforcement:** Strictly utilize preallocated buffers (Bepu `BufferPool` + `Buffer<T>`) and struct-based component patterns within Arch ECS. Never instantiate managed reference types (`class`) inside hot physics or simulation tick loops. Never pass a `ThreadDispatcher` to `Simulation.Timestep` (browser-wasm has no thread pool; null = deterministic single-threaded solve).

### ZERO_COPY_INTEROP_MANDATE

* **Description:** Single-player and local-buffer rendering states must cross the WebAssembly-JS boundary using zero-copy pinned memory buffers.
* **Enforcement:** Allocate transformation buffers using `GCHandle.Alloc(..., GCHandleType.Pinned)` in C# and project a `Float32Array` view over `WebAssembly.Memory.buffer` in TypeScript to update Babylon mesh transforms without garbage collection overhead.

### BABYLON_MESH_TRANSFORM_ALIGNMENT

* **Description:** Babylon.js v8 entity rendering must be driven by batched transform signals or shared-memory float arrays rather than per-entity JavaScript interop calls.
* **Enforcement:** Ensure C# 3D transform structures (`X`, `Y`, `Z`, rotation quaternion, `ScaleX/Y/Z`) align with Babylon mesh expectations. Update mesh positions/rotations in batch loops synchronized with render frames. Use `Mesh.instantiate` / thin instances (`thinInstanceSetBuffer`) for large entity counts (see `.agents/skills/babylonjs`).

### FLOAT32_LAYOUT_SYNC

* **Description:** The C# float32 signal layout (`SignalBufferLayout` strides in `Game.Engine.ECS.SignalBuffer.cs`) and the TypeScript decoders (`bufferLayout.ts` + per-scene `EntityDecoder`s) must never drift.
* **Enforcement:** Mark every sprite-state record struct with `[TypeScriptExport(floatStride)]`. The `Game.Engine.Generators` project validates it three ways: a Roslyn analyzer errors on stride mismatch (`BNOBO001`) and unsupported field types (`BNOBO002`); an incremental source generator emits `GeneratedSignalLayout` + a `[ModuleInitializer]` static assert that cross-checks the computed stride against `SignalBufferLayout` at WASM boot; the same generator writes the TypeScript half to `src/Game.UI/Frontend/scenes/generated/signalLayout.ts`. `bufferLayout.ts` imports the generated constants — never hand-maintain stride numbers in two places. The 2D float layouts are unchanged during the Babylon migration; the 3D transform layout (position + quaternion + scale) is a future ADR.

### ECS_PHYSICS_MAPPING

* **Description:** Keep Arch ECS component data and `BepuPhysics2` rigid body states synchronized without architectural coupling.
* **Enforcement:** Store physics body handles (`BodyHandle`, struct component `PhysicsBody`) inside Arch ECS. Use dedicated system loops to sync physics pose data directly into the pinned rendering transform array. Contact events surface through `INarrowPhaseCallbacks` (`AllowContactGeneration` filtering + `ConfigureContactManifold` begin-touch accumulation, resolved after `Timestep`).

### LOOP_DECOUPLING_RULE

* **Description:** Keep the fixed-step physics engine completely isolated from variable-step render ticks.
* **Enforcement:** Execute `BepuPhysics2` steps and Arch ECS updates inside a deterministic fixed-timestep accumulator loop. Never tie simulation or physics updates directly to browser `requestAnimationFrame` callbacks.

---

## WebAssembly Architecture Rule: Hybrid Web UI and C# Core Engine

This architectural specification defines the separation of concerns, interop patterns, and execution lifecycles for a high-performance 3D C# WebAssembly game engine utilizing **Babylon.js v8**, **Arch ECS**, **BepuPhysics2**, and a **TypeScript / Tailwind CSS DOM overlay**.

---

### 1. Core Architectural Boundaries

The engine separates performance-critical simulation logic from presentation and interface layers by establishing two distinct execution domains:

* **The Engine Core (C# / WASM / Native AOT):**
* Executes the Arch ECS tick loop, component memory updates, math processing, and `BepuPhysics2` rigid body dynamics.
* Writes transformation state directly into pinned unmanaged memory buffers or batched render signals.
* Acts as the single authoritative source of truth for all gameplay logic.

* **The Presentation and UI Domain (TypeScript / Babylon.js v8 / Tailwind CSS):**
* Executes inside the browser JavaScript runtime.
* Reads transformation matrices and coordinates from the shared WASM heap to update Babylon meshes, cameras, and scene graph.
* Renders HTML/CSS user interface overlays (inventories, health bars, HUDs) above the canvas using Tailwind CSS.

---

### 2. Interop Communication Standards (`[JSImport]` / `[JSExport]`)

To minimize serialization latency and prevent garbage collection pressure across the WebAssembly boundary, all communication must adhere to strict rules:

* **Zero polling rule:** Polling state across the interop boundary per frame via JSON or string serialization is strictly prohibited. Communication must be **event-driven, shared-memory bound, or streamed via batched deltas**.
* **Shared-heap transform bridge:** High-frequency transform updates occur with zero interop overhead by allowing JavaScript `Float32Array` views to read pinned C# transform buffers directly from the WASM memory heap.
* **Primitive-first events:** Low-frequency events (e.g., UI interactions, entity spawning) must only pass primitive types (`int`, `float`, `bool`) using `[JSImport]` and `[JSExport]`.

---

### 3. Simulation Lifecycle and Pause States

When displaying complex UI overlays, inventories, or paused states, the engine short-circuits the execution loop to conserve CPU cycles and GPU resources.

```csharp
// Architectural pattern for loop halting
private static bool _isSimulationPaused = false;

[JSExport]
public static void SetSimulationPaused(bool paused)
{
    _isSimulationPaused = paused;
}

public static void MainLoopTick(float deltaTime)
{
    if (_isSimulationPaused) 
    {
        // Skip physics steps and ECS updates.
        // The canvas retains its last rendered frame beneath the DOM overlay.
        return; 
    }

    ExecutePhysicsStep(deltaTime);
    ExecuteEcsSystems();
    SyncTransformsToPinnedBuffer();
}

```

---

### 4. Architectural Comparison Matrix

| Architectural Layer | Implementation Technology | Primary Responsibility | Execution Frequency |
| --- | --- | --- | --- |
| **Simulation & Physics** | C# (Arch ECS / BepuPhysics2 / .NET WASM) | Game rules, entity states, 3D rigid body collisions and dynamics. | Locked to target tick rate (e.g., 60 Hz fixed timestep). |
| **Graphics Pipeline** | TypeScript (Babylon.js v8 / WebGL2 / WebGPU) | Mesh rendering, scene graph, cameras, particles. | Frame-synchronized with browser `requestAnimationFrame`. |
| **Complex UI Layer** | Tailwind CSS / Vite / TypeScript | Menus, HUDs, inventory grids, configuration panels. | Event-driven (DOM-rendered on demand). |
| **Shared Memory Bridge** | Pinned `GCHandle` & `Float32Array` view | Zero-copy 3D transform and coordinate synchronization. | Direct memory read per render frame. |

---

## Repository Shape

- `bonoboWebGame.slnx` is the solution; projects target .NET 10.
- `src/Game.Engine` is a plain C# class library. Keep engine logic independent of UI and platform code. It hosts the Arch ECS (`Game.Engine.ECS`: components, `[Query]` systems, `EcsSimulation`) via vendored `src/Arch` + `src/Arch.Generators` (analyzer only), and the BepuPhysics2 physics world (`AsteroidsContext` → `Simulation`).
- `src/Game.Engine.Generators` is a Roslyn analyzer + source generator project (netstandard2.0, referenced by `Game.Engine` via `OutputItemType="Analyzer" ReferenceOutputAssembly="false"`). It enforces the zero-copy float32 layout contract: the `[TypeScriptExport]` marker attribute, the `LayoutAlignmentAnalyzer` (BNOBO001 stride mismatch / BNOBO002 unsupported field type), and the `TypeScriptInterfaceGenerator` which emits `GeneratedSignalLayout` + a `[ModuleInitializer]` boot-time static assert cross-checking `SignalBufferLayout`, plus the TypeScript half (`src/Game.UI/Frontend/scenes/generated/signalLayout.ts`). See the `FLOAT32_LAYOUT_SYNC` rule.
- `src/Game.UI` is a shared class library (non-Razor, plain `Microsoft.NET.Sdk`). It references `Game.Engine` and owns the Babylon.js frontend source (Vite + Tailwind + TypeScript) and static assets (audio, backgrounds). Built via `npm run build` in its folder.
- `src/Game.Tests` is the xUnit v3 test project (determinism self-checks, ECS unit tests, snapshot shape). `src/Game.Tests.Aot` is the TUnit test project (AOT/trim pattern checks over the `Game.Engine` closure). Both are in the solution and run under the Microsoft.Testing.Platform runner opted in via root `global.json` — do not delete that file or `dotnet test` misbehaves on .NET 10.
- `src/Game.Tests.UI` is the Node/TypeScript Playwright E2E suite. Not a `.csproj` — run from its folder via npm. Default browser channel is installed Chrome (`channel: 'chrome'`); machines without a system Chrome build can point at a Playwright chromium via `GAME_WEB_CHROME` (see `playwright.config.ts`). Config and host setup: see `docs/testing-ui-E2E/index.md`. Game-scene specs are parked in `src/Game.Tests.UI/archived-pixi-game-specs/` until the Babylon game renderers land.
- `src/Game.Wasm` is the browser-wasm host (non-Blazor, `Microsoft.NET.Sdk.WebAssembly`). Hosts simulations lazily per visited scene. Implements the `[JSImport]`/`[JSExport]` interop bridge with pinned shared memory buffer (`PinnedRenderBuffer`), typed command exports via `WasmInterop`, and the Babylon provider (wasm-interop.js module). Bootstraps via direct `import { dotnet } from './_framework/dotnet.js'` (no `blazor.webassembly.js`).
- `src/Game.Examples` is the example catalog (`ExamplesCatalog.cs` — games only since the PixiJS example catalogue was removed) and `IExampleSims` seam. Referenced by `Game.Wasm`.

- `src/bepuphysics2` is a **vendored** C# physics library (BepuPhysics2, Apache-2.0), **referenced** by `Game.Engine.csproj` as the authoritative physics world (ADR-002/011): `BepuPhysics` + `BepuUtilities` (net10.0, `CommonSettings.props`). Deterministic single-threaded solves (null `ThreadDispatcher`). `src/BrainAI` (pathfinding/AI) remains vendored but **unreferenced** — treat as a target dependency, not active. `src/Temp/` holds upstream samples/demos — not part of the build/solution.
- The Babylon.js v8 ecosystem (`@babylonjs/core`) is declared in `src/Game.UI/package.json`. **PixiJS, @pixi/*, box2d3-wasm and the PixiJS example scenes were removed** in the Babylon migration (ADR-010).

## Agent References

- `.agents/skills/babylonjs/` — vendored Babylon.js 8 skill (API patterns, procedural modeling, thin instances, PBR). Consult it when writing or verifying any Babylon code; prefer its API facts over memory or generic web knowledge.
- `docs/babylonjs/` — Babylon.js documentation subset (core concepts, meshes, materials, animation, performance).
- `docs/bepuphysics2/` — BepuPhysics2 documentation subset (Getting Started, determinism, substepping, stability, performance).
- `net-microsoft-documentation` MCP server — official, up-to-date Microsoft Learn docs for .NET, ASP.NET Core, Blazor, and MAUI. Use it for framework/API verification.
Summary of the scope an agent can search using this server:

  1. Programming Languages & RuntimesCore Languages: TypeScript, JavaScript, C#, F#, VB.NET, C++, Python, Java, Rust, PowerShell, Go.Frameworks & Runtimes: .NET Core / .NET 8+, ASP.NET Core, Node.js, React, Angular, Vue, Blazor, MAUI, WPF, WinUI.
  2. Microsoft Developer Tools & SDKsIDEs & Code Editors: Visual Studio, Visual Studio Code, Visual Studio Code Extensions (Copilot, Azure Tools).
  3. CLI & Command Line: Azure CLI (az), Azure Developer CLI (azd), PowerShell modules, Windows Terminal, WSL.
  4. SDKs: Azure SDKs across languages (Python, TypeScript, .NET, Java), Model Context Protocol (MCP) SDKs.

- `docs/2d-games` and `docs/game-development` — game architecture and gamedev workflow references (see `docs/index.md`).
- `docs/architecture/topology.md` — engine topology deep-dive (Implemented vs Target): three-layer runtime, WASM→JS bridge, physics, skeletal pipelines, domain matrix, ecosystem matrix, implementation status.
- `docs/adr/` — Architecture Decision Records. Read before changing cross-boundary, physics, render-bridge, or asset-pipeline decisions.

## Architectural Guardrails

**how data crosses the C#↔JS interop boundary** have been superseded by the migration to the **zero-copy shared memory pipeline**.

---

### Architectural Guardrails Status Matrix

| Guardrail Category | Status | Architectural Impact of the New Interop Layer |
| --- | --- | --- |
| **C# Authority & ECS / BepuPhysics2** | **Valid** | C# remains the sole authoritative simulation engine using Arch ECS and `BepuPhysics2`. Game logic and physics simulation are never executed in JavaScript. |
| **Transport Layer (`fetch` POST / SSE Streams)** | **Superseded** | The legacy SSE stream (`/api/ecs/stream` pushing JSON `SpriteState[]`) and HTTP POST render bridges are deprecated for rendering. They are replaced by direct, zero-copy `Float32Array` views over the WASM memory heap. |
| **Single-Player Local Default** | **Valid** | Local-buffer builds remain the default (`SINGLE_PLAYER_LOCAL`), avoiding unnecessary network abstraction layers during single-player execution. |
| **Temporal Context & Snapshots** | **Upgraded** | Instead of serializing temporal JSON snapshots over network bridges, hot-path coordinate, rotation, and scale data stream continuously via pinned unmanaged memory pointers (`GCHandle.Alloc` + WebAssembly heap mapping). |
| **Presentation Split (Babylon.js v8)** | **Valid** | Babylon.js v8 remains strictly responsible for rendering, mesh pools, camera control, and interpolation, reading directly from the shared memory buffer without per-entity interop polling. |

---

## Commands

Build frontend assets before .NET commands. Do not run multiple `dotnet` commands concurrently; static-web-asset compression can race.

Run from repository root:

```powershell
dotnet build bonoboWebGame.slnx
dotnet test          # Game.Tests (xUnit v3) + Game.Tests.Aot (TUnit); MTP runner via global.json
```

Run from `src/Game.UI`:

```powershell
npm ci
npm run build        # DEFAULT: single-player co-located bundle (__RENDER_SOURCE__='local-buffer')
npm run typecheck    # scoped tsconfig.app.json (Frontend) + tsconfig.node.json (vite.config.ts)
```

Run Playwright E2E from `src/Game.Tests.UI` (Node project; needs `npm ci` first):

```powershell
npm ci
npx playwright test        # boots Game.Wasm via dotnet run on port 5902, uses installed Chrome (channel: 'chrome')
npm run typecheck
# Machines without a system Chrome: GAME_WEB_CHROME=/path/to/chromium npx playwright test
```

**⚠️ ESM constraint:** `src/Game.Tests.UI/package.json` declares `"type": "module"`. Any standalone `.js` script written in that directory MUST use ESM `import` syntax (not `require()`). Use `.cjs` extension for CommonJS, or run scripts from the repo root. See `docs/testing-ui-E2E/index.md` §Standalone Screenshot Scripts for the corrected pattern (process lifecycle, path resolution, HTTP readiness polling).

For exploratory agent-driven browser work use the `playwright-cli` skill with Chrome: `playwright-cli open <url> --browser=chrome`. A Playwright MCP server is NOT needed — skills + playwright-cli + the checked-in Playwright suite cover this repo (verdict + rationale in `docs/testing-ui-E2E/index.md`).

`Game.UI` scripts build Vite JavaScript first, then Tailwind CSS. Vite reads `Frontend/game.ts` and writes generated files to `src/Game.UI/wwwroot/dist`; do not hand-edit generated output. `npm run watch:js` and `npm run watch:css` are separate long-running watchers.

MAUI builds require .NET MAUI workloads. Platform-specific target frameworks may make full-solution builds depend on host OS and installed workloads.

## Verification Notes

- Test projects: `Game.Tests` (xUnit v3), `Game.Tests.Aot` (TUnit), `Game.Tests.UI` (Playwright, Node-only, not in the solution). Full guide: `docs/testing-ui-E2E/index.md`. `Game.Maui` is temporarily commented out of the solution (web-only builds for speed).
- After touching `Game.UI` frontend assets, kill any running `Game.Wasm.exe` before rebuilding. 500s on `dist/*` (`game-bundle.js`, `app.css`) = stale/raced output from the `CopyGameUIAssets` MSBuild target; fix by killing the host and rebuilding (delete `src/Game.Wasm/bin`+`obj` if it persists).
- `bin/`, `obj/`, `node_modules/`, and other build output are ignored. Do not commit them.
- Trust `.csproj`, `.slnx`, `package.json`, and executable build output over setup prose in `README.md`.
- `docs/index.md` describe architecture; `docs/ai-agents/codebase-truth.md` holds verified API facts; record significant decisions in `docs/adr/`.
- **Bepu on WASM:** never pass a `ThreadDispatcher` to `Simulation.Timestep` (no thread pool in the browser). The asteroids sim enforces a 2D plane via the pose integrator (z-locked linear velocity + off-z angular velocity) and contact categories via a `CollidableProperty<int>` matrix.

## Agent Rules

### SHELL_TIMEOUT_600
***Enforcement:** Always run any shell command with a timeout of 300 seconds (300000 ms).