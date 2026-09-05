# ADR-010: Babylon.js replaces PixiJS (2D → 3D rendering)

**Date:** 2026-09-04
**Status:** Accepted

## Context

The engine's presentation layer was PixiJS v8 (2D sprites, containers, filters, tilemaps, sound) plus a large example catalogue (`Frontend/scenes/*`, 30 files) and a C# catalog of PixiJS examples. The engine core was 2D-framed (court pixels, `Rotation` as a scalar angle, `Position { X, Y }`). The migration goal: a 3D renderer with the same zero-copy shared-memory interop contract.

## Options Considered

1. **Keep PixiJS, add 3D via a second renderer** — two display pipelines, duplicated interop, drift risk.
2. **Babylon.js v8 (`@babylonjs/core`)** — WebGL2/WebGPU 3D engine, thin instances for batching, glTF support, camera/lighting built in; tree-shakeable ESM deep imports.

## Decision

Babylon.js v8 replaces PixiJS as the single presentation frontend (ADR-010).

- All PixiJS packages (`pixi.js`, `@pixi/*`, `pixi-filters`, `pixi-viewport`, `@spd789562/particle-emitter`) and `box2d3-wasm` removed from `src/Game.UI/package.json`; `@babylonjs/core` added.
- All 30 PixiJS scene files + the stats overlays deleted from `Frontend/`; `Frontend/game.ts` is now a Babylon bootstrap (Engine, Scene, ArcRotateCamera, hemispheric light, ground + demo mesh, render loop).
- `ExamplesCatalog.cs` trimmed to the six games (PixiJS example entries removed).
- The zero-copy bridge is unchanged: pinned `GCHandle` buffer → `[JSImport] notifyRender` → `Float32Array` over the WASM heap.
- Game *simulations* are untouched and run headless; per-game Babylon renderers (buffer consumers) are the next iteration.

## Consequences

- The 2D float32 signal layouts remain in force until a 3D transform layout (position + quaternion + scale) ADR lands.
- `game.ts` event handshake renamed `pixi-bundle-ready` → `babylon-bundle-ready` (wasm-interop.js, main.mjs).
- Playwright game-scene specs parked in `src/Game.Tests.UI/archived-pixi-game-specs/` until the Babylon game renderers exist; `home.spec.ts` asserts the Babylon canvas + live WebGL2 context.
- `docs/architecture/render-interpolation.md` §3 (box2d3-wasm presentation physics) marked removed/superseded.

---

# ADR-011: BepuPhysics2 replaces Box2D.NET (authoritative physics)

**Date:** 2026-09-04
**Status:** Accepted

## Context

The authoritative physics backend was Box2D.NET (2D, vendored at `src/Box2D.NET`), consumed only by `AsteroidsSimulation` (circle bodies, contact events via `b2World_GetContactEvents`, category/mask filters, screen wrap, deterministic single-worker world). `src/Box2D.NET` was already removed from the tree (the previous commit), leaving `Game.Engine` referencing a missing project. BepuPhysics2 (3D) was vendored at `src/bepuphysics2` (net10.0).

## Options Considered

1. **Port Asteroids to BepuPhysics2** — keep authoritative physics authority, new 3D-capable backend for the engine's future.
2. **Drop the physics world from Asteroids** — kinematic ECS stepping + manual circle tests; loses authoritative dynamics.

## Decision

BepuPhysics2 becomes the authoritative physics backend (ADR-011); `Game.Engine.csproj` references `BepuPhysics` + `BepuUtilities`.

- `PhysicsBody` component now stores a `BodyHandle` (blittable int, AOT-safe).
- `AsteroidsContext` owns a `Simulation` (BufferPool, zero-gravity `PoseIntegratorCallbacks`, `Sphere` shapes, `SolveDescription(4, 4)` sub-steps).
- 2D-plane behaviour inside the 3D solver: the pose integrator zeroes Z linear velocity and off-Z angular velocity every integration.
- Contact filtering via `CollidableProperty<int>` category matrix (`AsteroidsConfig.ContactFilter`); begin-touch pairs accumulated in `INarrowPhaseCallbacks.ConfigureContactManifold` (depth ≥ 0) and resolved after `Timestep`.
- Deterministic single-threaded solves: **never** pass a `ThreadDispatcher` to `Simulation.Timestep` (browser-wasm has no thread pool).
- Screen wrap rewrites body poses directly (`Bodies[handle].Pose`).

## Consequences

- `AsteroidsSimulationTests`/`AsteroidsAotPatternTests` revalidated; two stale assertions corrected (ship thrust equilibrium unit, saucer survival window — saucer legitimately exits after `SaucerMaxPasses` crossings).
- Bepu on WASM: Release AOT publish must be verified separately (SIMD/Vector256 paths degrade gracefully).
- Future 3D games get a real 3D rigid-body backend for free.