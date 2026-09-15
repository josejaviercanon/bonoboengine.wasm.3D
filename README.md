# Bonobo Engine — C# WASM 3D (Babylon.js + BepuPhysics2)

C# browser-wasm monorepo: a pure C# game engine (`Game.Engine` with Arch ECS + BepuPhysics2), a Roslyn analyzer + source generator project (`Game.Engine.Generators`), a shared class library owning the Babylon.js frontend (`Game.UI`), a non-Blazor browser-wasm host (`Game.Wasm`), a WinUI 3 + WebView2 native-AOT desktop host (`Game.WinApp`), and a TypeScript-driven Babylon.js build managed by Vite and Tailwind CLI.

Start with this project mainly because current monogame at 2026 don't have export to web option. Note that for real time games, authoritative ECS in server is not the best option by the http event process for each render update, so added a compilation conditional for single player games.

> **This README mirrors `docs/index.md`, the source of truth for the stack and architecture.** When code and prose disagree, trust `docs/index.md`, `docs/ai-agents/codebase-truth.md`, `AGENTS.md`, and the `.csproj` / `.slnx` / `package.json` files over anything else in this document.

---

## Mission

Computing your entire game logic inside C#. It allows you to build a single, authoritative simulation engine that runs client-side inside .NET MAUI or the browser today, and can be dropped directly onto a dedicated .NET Linux server tomorrow for authoritative multiplayer.

To make this architecture work without destroying performance, you must isolate the **Simulation Layer (C#)** from the **Presentation Layer (Babylon.js/Tailwind)**.

## 🧱 The Authoritative C# Architecture

```
+---------------------------------------------------------------------------------+
|                    1. SHARED CORE ENGINE (C# Class Library)                     |
|  - Holds Game State (Entities, Grid, Stats)     - Runs Simulation Ticks         |
|  - Command/Event System (Inputs, Actions)       - Pure C# Logic (AOT Friendly)  |
|  - Authoritative physics: BepuPhysics2 (deterministic, single-threaded)         |
+---------------------------------------------------------------------------------+
                                        |
                    +-------------------+-------------------+
                    |                                       |
+--------------------------------------+   +--------------------------------------+
|        2. PRESENTATION BRIDGE        |   |       3. FUTURE SERVER HOSTER        |
|  - Non-Blazor browser-wasm host      |   |  - ASP.NET Core Minimal API / WebSockets
|  - [JSImport]/[JSExport] + shared    |   |  - Runs the exact same Core Engine   |
|    memory (Float64 over WASM)        |   |  - Verifies incoming client commands |
|  - WinUI 3 + WebView2 desktop host   |   |                                      |
|    (native AOT, shared buffers)      |   |                                      |
+--------------------------------------+   +--------------------------------------+
```

1. **The Core Simulation Engine (Pure C#)** — a standard .NET Class Library. It knows absolutely nothing about graphics, rendering, or browsers.
   - *State Management:* manages coordinates, stats, pathfinding matrices, and entity maps.
   - *The Deterministic Tick:* runs the Arch ECS systems each fixed step and emits one **batched** render signal per interval — not one event per entity — so the presentation layer mirrors authoritative state without per-frame interop.
   - *Physics:* `BepuPhysics2` (vendored at `src/bepuphysics2`). The asteroids sim runs a 2D-plane court inside the 3D solver (z-locked pose integrator), with contact filtering via a `CollidableProperty<int>` category matrix and begin-touch accumulation in `INarrowPhaseCallbacks`. Never pass a `ThreadDispatcher` to `Simulation.Timestep` on the browser host.
2. **The Presentation Layer (Babylon.js v9 + Tailwind)** — a pure mirror of your C# state.
   - *Tailwind UI:* DOM overlays (menus, HUDs, inventory grids) on top of the canvas.
   - *Babylon.js Canvas:* reads transform state from the pinned shared-memory buffer (`Float64Array` over the WASM heap in the browser and over a WebView2 shared buffer on desktop) and updates meshes/cameras per render frame — no per-entity interop calls.

### ⚠️ The Performance Gold Rule: Avoid JSON Serialization

Polling C# from JavaScript every frame, or serializing the whole state tree per frame, will reduce your game's frame rate down to single digits. Use the **Push-Based Batched Signal** approach: the engine emits one batched render signal per fixed tick into a pinned `GCHandle` buffer; JS reads it through a typed-array view (browser: `[JSImport] notifyRender` → `Float64Array` over `HEAPF64`; desktop: `sharedbufferreceived` from `PostSharedBufferToScript`). Zero copies, no JSON, no reflection.

## 🧬 Engine Topology: Simulation ↔ Presentation ↔ Render

```
C# AUTHORITATIVE WORLD          Arch ECS + BepuPhysics2 (3D rigid-body authority)
        │  fixed timestep → RenderSnapshot (Tick, Pos, Velocity) → pinned buffer
        ▼
BABYLON.JS v9                   meshes, thin instances, camera, particles, GPU
```

- **Never** move simulation back-and-forth through JS interop every frame. Cross the boundary only via batched render snapshots.
- **Bridge status:** zero-copy shared memory pipeline implemented on both hosts: C# writes signal snapshots into a pinned `GCHandle` buffer (`PinnedRenderBuffer<T>`) → the browser host reads the `Float64Array` over the WASM heap via `[JSImport] notifyRender`; the desktop host copies the same span into a `CoreWebView2SharedBuffer` (`PostSharedBufferToScript`) and the page wraps it as a `Float64Array` (`docs/architecture/desktop-webview2.md`). Client interpolation: `P_render = P_prev + (P_curr − P_prev) × α`.
- **Domain ownership:** C# owns game rules, collision, character controllers, deterministic simulation. Babylon.js owns mesh transforms, camera control, interpolation, particles.
- **Physics:** BepuPhysics2 = authoritative 3D rigid-body simulation (C# ECS loop, vendored at `src/bepuphysics2`).

Full matrices (ecosystem integration, implementation status, packages) live in `docs/architecture/topology.md`. Decisions: `docs/adr/`.

**Single-player local is the default build.** `SINGLE_PLAYER_LOCAL` is the default C# compilation constant; `npm run build` produces a local-buffer bundle (`__RENDER_SOURCE__='local-buffer'`) with zero HTTP client code. Multiplayer is opt-in: build with `npm run build:web` + `/p:IsMultiplayer=true`.

## 🛠️ Current Iteration Status

- **Frontend:** `Frontend/game.ts` hosts the Babylon.js demo-balls scene (free camera + collisions, CannonJS physics arena, amiga-textured spheres, shadow-casting directional light) as the main page.
- **Examples:** The WASM host stays as minimal interop bootstrap for future simulations.

## 🚀 Future-Proofing for Authoritative Multiplayer

- You pluck your Shared Core Engine project out of the client build and compile it into a headless ASP.NET Core console application hosted on Linux.
- Your client UI serializes the `MoveCommand` and shoots it over a SignalR or WebSocket connection instead of calling the local sim directly.
- The server runs the command through the exact same C# simulation code, processes the ticks, and broadcasts the batched render signal across the network to all connected clients.
- Your Babylon.js setup handles the network event exactly like it handled the local event during the MVP phase.

## Sourced Ecosystem Libraries & Starting Points

- **Game State Engine (Arch ECS):** a high-performance, ultra-lightweight C# Archetype Entity Component System (vendored at `src/Arch`).
- **Physics (BepuPhysics2):** deterministic 3D rigid-body simulation, single-threaded solves on the browser-wasm host (vendored at `src/bepuphysics2`).
- **Canvas & Presentation Layer (Babylon.js v9):** 3D WebGL2/WebGPU hardware-accelerated rendering with mesh pooling, thin instances, and glTF support (`@babylonjs/core`).
- **UI Layout & Theme Canvas (Tailwind CSS):** responsive HUDs, menus, popups, and inventory windows using standard HTML/CSS.
  - **Shared-Memory Bridge:** pinned `GCHandle` + `Float64Array` over the WASM heap (browser) or WebView2 shared buffers (desktop); the C#↔TS layout (element strides + scalar sizes) is kept in lockstep by `Game.Engine.Generators` (analyzer + source generator + boot-time assert).

## Repository Layout

```
bonoboWebGame.slnx          # .NET solution (XML solution format)
src/
├── Game.Engine/            # Pure C# class library (authoritative simulation: Arch ECS + BepuPhysics2)
│                           #   ECS/SimulationHost.cs — host-agnostic sim control + pinned buffers
├── Game.Engine.Generators/ # Roslyn analyzer + source generator (zero-copy signal layout guardrails)
├── Game.UI/                # Shared class library (Babylon.js frontend source + static assets)
│   ├── Game.UIAssets.targets # Shared MSBuild asset pipeline used by every host (prune + copy + fail-fast)
│   ├── wwwroot/dist/       # Vite + Tailwind output (generated, NOT tracked — run `npm run build`)
│   └── Frontend/           # Babylon.js TypeScript entry (game.ts) + Tailwind CSS
├── Game.Wasm/              # browser-wasm host (non-Blazor; [JSImport]/[JSExport] interop, heap view)
├── Game.WinApp/            # Windows desktop host (WinUI 3 + WebView2 + Native AOT, shared buffers)
├── Game.Tests/             # xUnit v3 tests (determinism, ECS, signal layout)
├── Game.Tests.Aot/         # TUnit AOT/trim pattern tests
├── Game.Tests.UI/          # Playwright E2E suite (Node — not in the .NET solution)
├── bepuphysics2/           # vendored C# physics library (authoritative)
├── Arch/ Arch.Generators/  # vendored ECS + source generator
├── BrainAI/                # vendored pathfinding/AI (unreferenced — target dependency)
└── Temp/                   # upstream samples/demos (not part of the build/solution)
docs/
├── index.md                # Architecture source of truth
├── architecture/           # topology.md, render-interpolation.md, desktop-webview2.md
└── game-development/       # Curated engine-agnostic gamedev knowledge base
AGENTS.md                   # Agent build/workflow rules
```

## Getting Started

### Prerequisites

- .NET 10 SDK
- Node.js (LTS) — for Vite and Tailwind CLI
- Edge **WebView2 runtime** — only needed for the `Game.WinApp` desktop host (ships with current Windows)
- MAUI workloads (only needed for `Game.Maui` builds — currently commented out of the solution)

> `src/Game.UI/wwwroot/dist` is **not tracked**. Every host copies it at build time and fails fast with an instructive error when it is missing, so run `npm ci && npm run build` in `src/Game.UI` first — or pass `-p:BuildFrontend=true` to a host build.

### How to Build and Run a Single-Player Game (Default)

Single-player is the **default** build mode. The C# simulation runs in-process
in the browser via the non-Blazor browser-wasm host (`Game.Wasm`,
`Microsoft.NET.Sdk.WebAssembly`). No HTTP, no SSE, no server — zero network
overhead. `SINGLE_PLAYER_LOCAL` is defined automatically.

```powershell
# 1. Build frontend assets (local-buffer bundle — default Vite mode)
cd src/Game.UI
npm ci
npm run build
cd ../..

# 2. Build and run the browser-wasm host
dotnet build bonoboWebGame.slnx
dotnet run --project src/Game.Wasm    # serves http://localhost:5902 (see launchSettings.json)
```

Open the URL in Chrome/Edge/Firefox — the Babylon.js demo-balls scene (CannonJS
physics arena, amiga-textured spheres, free camera) renders fullscreen. No game
examples or launch menu remain; the WASM host boots the interop bridge for future
simulations.

Render signals travel as pure 64-bit buffers: `DirectRenderTransport<TSignal, T>` encodes each batched signal into the canonical layout (`SignalBuffer.cs` — 8-byte doubles for `sprite-move` and `transform3d` alike), writes it into a pinned `GCHandle` array, and notifies JS via `[JSImport]("notifyRender")` — JS views it as a `Float64Array` over the WASM heap.

For best raw sim throughput, publish with AOT (needs
`dotnet workload install wasm-tools`; dev runs stay interpreted):

```powershell
dotnet publish src/Game.Wasm -c Release   # RunAOTCompilation + WasmStripIL
```

### How to Build and Run the Windows Desktop Host (`Game.WinApp`)

WinUI 3 + WebView2 + **Native AOT**: the native process runs the same ECS/Bepu simulation and
streams transforms into the page through WebView2 shared buffers — no JSON, no per-entity
interop. Details: `docs/architecture/desktop-webview2.md`.

```powershell
dotnet run --project src/Game.WinApp                 # Debug window (unpackaged)
dotnet publish src/Game.WinApp/Game.WinApp.csproj -c Release -r win-x64 -p:Platform=x64 -p:BuildFrontend=true
# → src/Game.WinApp/bin/Release/net10.0-windows10.0.26100.0/win-x64/publish/Game.WinApp.exe (+ wwwroot/)
```

### How to Build a Multiplayer (Server-Authoritative) Bundle

The SSE/multiplayer transport is retained as an opt-in branch. Build
the `sse` frontend transport and the server-authoritative constants:

```powershell
cd src/Game.UI && npm run build:web      # Vite --mode web → __RENDER_SOURCE__='sse'
dotnet build bonoboWebGame.slnx /p:IsMultiplayer=true /p:IsEcsServerSide=true
```

The single-player local-buffer path remains the default and the only fully
built-out host in this repository.

### Build & Test

```powershell
dotnet build bonoboWebGame.slnx
dotnet test          # Game.Tests (xUnit v3) + Game.Tests.Aot (TUnit); Playwright suite is separate (src/Game.Tests.UI)
```

> Build frontend assets before .NET commands (`src/Game.UI/wwwroot/dist` is untracked). Do not run multiple `dotnet` commands concurrently — static-web-asset compression can race. See `AGENTS.md` for the full command reference.

## Games and Examples

The default page renders the Babylon.js demo-balls scene; the ECS scene renders 12 spheres driven by the float64 `transform3d` buffer. Future games plug into the same shared-memory bridge kept in `Game.Engine.ECS.SimulationHost` (pinned buffers + `BufferNotify`), consumed by `Game.Wasm` (heap view) and `Game.WinApp` (WebView2 shared buffers).

## Licensing

- **Source Code:** Distributed under the [MIT License](./LICENSE).
- **Media Assets (Graphics, Sound, Music):** Subject to third-party rights and provided strictly for educational and demonstration purposes. See [LICENSE-ASSETS.md](./LICENSE-ASSETS.md) for full terms before reusing any media files.