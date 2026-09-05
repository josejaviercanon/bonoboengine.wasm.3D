# Architecture Topology — C# ECS Engine in browser-wasm Native-AOT Host (Babylon.js v8)

> Detailed companion to `docs/index.md` (the architecture source of truth). Decisions live in `docs/adr/`; verified facts in `docs/ai-agents/codebase-truth.md`. This file marks **Implemented** vs **Target** explicitly. When code and prose disagree, verified files win.

## The Dual-Runtime State Machine

Integrating Babylon.js v8 into a C# browser-wasm Native-AOT host shifts execution into a hybrid dual-runtime:

1. **C# WASM / Mono Runtime Layer** — pure game logic, ECS entity lifecycle, system updates, spatial partitioning, state machines, physics.
2. **JS / WebGL2 / WebGPU Presentation Layer** — Babylon.js v8, hardware-accelerated 3D pipelines, audio contexts, skeletal mesh rendering.
3. **WebAssembly Memory Boundary** — the high-speed data link from C# component arrays to Babylon.js transform buffers.

```
C# ECS Engine Core (Arch + BepuPhysics2)
   |  native logic / systems                 |  fixed-step physics (BepuPhysics2)
   v                                         v
C# Transform & Motion Systems (contiguous)   C# Physics Engine (BepuPhysics2, single-threaded)
   |  zero-copy / direct HEAPF32 transfer
   v
=============== WASM Interop Boundary (memory HEAP) ===============
   |  batched render snapshot / matrix buffer
   v
Babylon.js v8 Presentation Layer (WebGL2 / WebGPU pipelines)
   |-- meshes |-- thin instances |-- cameras |-- PBR |-- glTF 2.0 (target)
```

## Three Layers (ADR-001)

| Layer | Role | Status |
| --- | --- | --- |
| **1. C# Authoritative World** | ECS + BepuPhysics2; gameplay physics, collisions, rules, deterministic tick. Sole authority. | Arch ECS implemented (`EcsSimulation` 60 Hz, `MovementSystem`/`ColorSystem`, batched `EcsRenderSignal`, SSR `Snapshot()`; games: Snake, Tetris, Breakout, Asteroids, Pacman, Racer). BepuPhysics2 **wired** into `Game.Engine` and used by `AsteroidsSimulation` as the authoritative physics world (sphere bodies, sub-stepped solves, contact filtering via `CollidableProperty<int>` matrix, begin-touch accumulation in `INarrowPhaseCallbacks`, screen wrap, deterministic single-threaded `Timestep` with null `ThreadDispatcher`). |
| **2. Presentation World** | Client-side interpolation between authoritative snapshots (default). Pure mirror of authoritative state. | Interpolation math implemented in the shared-buffer decoders (`SnapshotBuffer`); per-game Babylon renderers that consume the buffers are **Target**. |
| **3. Babylon.js v8** | Meshes, thin instances, cameras, lights, materials, particles, GPU render. | Bootstrap implemented (`initGame`/`renderScene` in `Frontend/game.ts`: ArcRotateCamera, hemispheric light, ground + demo mesh, render loop). Per-game 3D renderers are Target. |

Rule: never move simulation back-and-forth through JS interop every frame. The simulation writes batched snapshots into shared memory; Babylon reads them at render-frame rate. Client-side interpolation implementation guide: `docs/architecture/render-interpolation.md`.

## The WASM->JS Bridge (ADR-003, ADR-008)

**Problem:** per-entity interop at 60 FPS saturates the boundary; simulation (60 Hz) and display (144 Hz) differ in time domain -> jitter.

**Implemented (ADR-008):** zero-copy shared-memory pipeline. The simulation writes each batched render snapshot into a pinned `float[]` (`GCHandle.Alloc(..., Pinned)`), passes the raw pointer to JS via `[JSImport]("notifyRender")`, and JS reads `new Float32Array(heap.buffer, ptr, count)` over the WASM heap — no JSON, no byte[] copy, no `IJSRuntime`. Client interpolates: `P_render = P_prev + (P_curr - P_prev) * alpha`, `alpha = (T_now - T_last_tick) / T_tick`.

**Deprecated:** `GET /api/ecs/stream` SSE pushing `event: sprite-move` with batched `SpriteState[]` JSON — the legacy transport, superseded by the pinned-buffer path (retained only in the opt-in multiplayer `--mode web` / `npm run build:web` build).

The canonical float32 layout lives in `Game.Engine.ECS.SignalBuffer.cs` (`SignalBuffer` + `SignalBufferLayout` + `SignalBufferEncoders`). The C# and TS halves are kept in lockstep by `src/Game.Engine.Generators` — see "Zero-Copy Layout Guardrails" below. The 3D transform layout (position + quaternion + scale) is a future ADR; the current float layouts remain 2D-shaped until the game renderers land.

## Zero-Copy Layout Guardrails

The C# float32 layout and the TypeScript decoders must never drift. `src/Game.Engine.Generators` (Roslyn analyzer + source generator) enforces this three ways:

| Vector | Phase | Mechanism |
| --- | --- | --- |
| Stride / type validation | Compile-time (IDE + MSBuild) | `LayoutAlignmentAnalyzer` — `BNOBO001` errors when a `[TypeScriptExport(n)]` struct's computed float-stride ≠ `n`; `BNOBO002` errors on field types that cannot float32-encode. |
| Boot-time static assert | Load-time (WASM boot) | `TypeScriptInterfaceGenerator` emits `GeneratedSignalLayout` + a `[ModuleInitializer]` that asserts each computed stride equals the matching `SignalBufferLayout` constant. |
| TypeScript half | Build-time | The same generator writes `src/Game.UI/Frontend/scenes/generated/signalLayout.ts` (interfaces + stride constants). |

Every sprite-state record struct carries the marker: `SpriteState` (stride 6), `SnakeSpriteState` (11), `PacmanSpriteState` (16), `BreakoutSpriteState` (8), `AsteroidsSpriteState` (11), `RacerCarState` (6).

## Physics Architecture (ADR-002, ADR-005 → ADR-011)

```
C# ECS + BepuPhysics2 (authoritative) -> snapshots -> shared-memory bridge
   |-- client interpolation (cheap / default)
   \-- Babylon.js v8 renderer (target)
```

- **BepuPhysics2** = authoritative gameplay physics in the C# ECS loop (vendored at `src/bepuphysics2`, ADR-011). Deterministic single-threaded solves (null `ThreadDispatcher`); no JS-side physics world.
- **Custom lerp** = default for plain interpolation (zero-overhead).
- Four answers: BepuPhysics2 = "where is it really?"; interpolation = "where to draw?"; Babylon.js = "how to render?"
- **Removed:** Box2D.NET (backend) and box2d3-wasm (JS presentation physics) were removed in the 3D migration (ADR-010/011). The asteroids court now runs as a 2D plane inside the 3D solver: zero gravity, z-locked linear velocity and off-z angular velocity in the pose integrator, `CollidableProperty<int>` category matrix for contact filtering.

## Skeletal Animation — Two Pipelines (ADR-004)

- **Pipeline A — Authoring (offline):** AI Agent + Blender `bpy` -> armature + animations -> `.glb`. `AI + Blender = Content Pipeline`, not game runtime.
- **Pipeline B — Runtime:** `.glb` -> glTF Importer (C#) -> ECS -> `AnimationSystem` -> `TransformSystem` -> `SkinningSystem` -> joint matrix palette -> Babylon.js/GPU.

glTF = input asset format, **not** the ECS architecture. A character = one entity with data-oriented components:

```
SkeletonComponent { JointCount, ParentIndices[], LocalTransforms[], GlobalTransforms[],
                    InverseBindMatrices[], JointEntities[] }   // contiguous arrays
AnimationPlayerComponent { CurrentClip, CurrentTime, PlaybackSpeed, Loop, State }
SkinnedMeshComponent - RenderComponent
```

Animation state machine belongs to the ECS, not glTF. See `docs/2d-skeletal-animations/index.md`.

## Domain Responsibility Matrix (ADR-006)

| Responsibility | C# (Sim) | Babylon.js (Pres.) |
| --- | :---: | :---: |
| Game rules & logic | Y | N |
| Collision & hit detection | Y | N |
| Gravity & impulses | Y | N |
| Character controllers | Y | N |
| Deterministic networking | Y | N |
| Position interpolation | N | Y |
| Mesh transforms & animation | N | Y |
| Camera control & smoothing | N | Y |
| Secondary motion (cloth, ragdoll) | N | Y |
| Particle physics & screen effects | N | Y |

## Ecosystem Integration Matrix

| Component | Runtime | State source of truth | Interop | Role |
| --- | --- | --- | --- | --- |
| Babylon.js core (`@babylonjs/core` v8) | JS (WebGL2/WebGPU) | JS scene graph | shared memory buffer (implemented, ADR-008) | View layer; consumes transform buffers |
| Babylon thin instances (`thinInstanceSetBuffer`) | JS (GPU) | C# transform array | shared memory buffer (target) | large entity counts, single draw call |
| Babylon cameras (ArcRotate etc.) | JS | C# camera entity (target) | shared buffer (target) | C# `CameraSystem` focus -> JS camera |
| glTF 2.0 / `.glb` | JS (GPU skinning, target) | C# skeleton comps (target) | event-driven | animation triggers from C#; skinning on GPU |
| C# physics (BepuPhysics2) | C# WASM | C# RigidBody comps | zero interop | solves dynamics in WASM memory |
| HTML5 HUD | JS / DOM overlay | reactive state | native data binding | HTML5 HUD over canvas; crisp, accessible |

## Ecosystem Packages

The Babylon.js v8 stack is declared in `src/Game.UI/package.json`: `@babylonjs/core` (tree-shaken deep imports). **PixiJS, @pixi/*, box2d3-wasm and the PixiJS example scenes were removed** (ADR-010). Vendored C# `src/bepuphysics2` (BepuPhysics + BepuUtilities, net10.0) is **referenced** by `Game.Engine.csproj` and used by `AsteroidsSimulation`; `src/BrainAI` (pathfinding/AI) remains unreferenced.

## Implementation Status

| Capability | Status |
| --- | --- |
| Arch ECS sim (60 Hz, systems, batched signal) | Implemented |
| Babylon.js bootstrap (`initGame`/`renderScene`, canvas, camera, light, demo mesh) | Implemented (ADR-010) |
| Games: Snake, Tetris, Breakout, Asteroids, Pacman, Racer (ECS authority + input; headless sims) | Implemented |
| BepuPhysics2 authoritative physics in ECS loop (Asteroids: sphere bodies, contact events, wrap, 2D plane) | Implemented (ADR-011) |
| Per-game Babylon renderers (buffer consumers, thin instances) | Target |
| 3D transform float32 layout (position + quaternion + scale) | Target (future ADR) |
| Render transport seam: `IRenderTransport<TSignal>` injected into all sims, `ServerRenderTransport` default, `SINGLE_PLAYER_LOCAL` build switches in `Game.Engine.csproj` | Implemented (ADR-007 Phase 1) |
| Single-player-local default: `SINGLE_PLAYER_LOCAL` + `local-buffer` are the default builds; `fetch` POST exists only in the `--mode web` / `npm run build:web` multiplayer branch | Implemented (ADR-007) |
| `Game.Wasm` co-located host: `PinnedRenderBuffer` + `DirectRenderTransport` (zero-copy: pinned `GCHandle` → `[JSImport] notifyRender(ptr, count)` → JS reads `Float32Array` over WASM heap), typed `[JSExport]` commands, `WasmInterop` bridge module (`wasm-interop.js`). | Implemented (ADR-007 Phase 3 / ADR-008) |
| `IExampleSims` seam — `SimHost` provides lazy sims in `Game.Wasm` | Implemented (ADR-007 Phase 2) |
| `Game.Wasm` Release AOT publish — `RunAOTCompilation` + `WasmStripIL`, vendored Arch generic templates capped at arity 15 (`Helpers.ttinclude` `Amount=16`); `[JSImport]/[JSExport]` source-gen interop (AOT-safe, no reflection) | Implemented (ADR-007 Phase 3) |
| Interop hygiene — `WasmInterop.Initialize` in `Program.cs`, `babylon-bundle-ready` event handshake, no `DotNetObjectReference`/`CommandJsonContext` | Implemented (ADR-008) |
| Zero-copy layout guardrails — `Game.Engine.Generators`: `[TypeScriptExport]` stride analyzer (`BNOBO001`/`BNOBO002`) + `GeneratedSignalLayout` `[ModuleInitializer]` assert + generated `signalLayout.ts` | Implemented |
| BepuPhysics2 for other games (Snake/Tetris/Breakout) | Target |
| glTF importer + skeletal ECS components | Target |
| Camera / tilemap / audio / culler integration | Target |