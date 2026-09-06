# Verified API Facts (bonoboengine.wasm.3D)

Verified against the checked-in sources. When prose docs and these facts disagree, code wins.

## BepuPhysics2 (vendored `src/bepuphysics2`, net10.0, ADR-011)

- Simulation creation: `Simulation.Create<TNarrowPhaseCallbacks, TPoseIntegratorCallbacks>(BufferPool, narrowPhase, poseIntegrator, SolveDescription, ...)` — generic struct callbacks; `Initialize(Simulation)` is invoked inside Create.
- `SolveDescription(int velocityIterationCount, int substepCount, ...)`.
- `Simulation.Timestep(float dt, IThreadDispatcher threadDispatcher = null)` — pass null on browser-wasm (deterministic single-threaded).
- Body creation: `BodyDescription.CreateConvexDynamic(RigidPose, BodyVelocity, float mass, Shapes, in TConvexShape)` adds the shape to the Shapes collection; override `description.Activity = new BodyActivityDescription(-1f, 32)` to disable sleeping (negative sleep threshold never sleeps).
- `Bodies.Add(in BodyDescription)` → `BodyHandle`; `Bodies[handle].Pose` (ref `RigidPose` with `Position`/`Orientation`), `Bodies[handle].Velocity.Linear` (ref); `Bodies.Remove(handle)`; `Bodies.BodyExists(handle)`.
- `CollidableProperty<T>` (class, unmanaged T): `new CollidableProperty<int>()` then `Initialize(simulation)` inside the narrow-phase callbacks; `Allocate(handle) = value` per body; `Dispose()` must run BEFORE `Simulation.Dispose()`/`BufferPool.Clear()`.
- `INarrowPhaseCallbacks`: `AllowContactGeneration(workerIndex, a, b, ref speculativeMargin)` for pair filtering (reject statics; use `CollidableReference.Mobility == CollidableMobility.Static`); `ConfigureContactManifold<TManifold>` reports manifolds (generic `IContactManifold<TManifold>`: `.Count`, `.GetDepth(i)`); `pairMaterial = new PairMaterialProperties(0.05f, 4f, new SpringSettings(30f, 1f))`.
- `IContactManifold` contact depths are negative for speculative separation — test `GetDepth(i) >= 0f` for "touching".
- 2D-plane lock pattern: `IPoseIntegratorCallbacks.IntegrateVelocity` zeroes `velocity.Linear.Z`, `velocity.Angular.X`, `velocity.Angular.Y` (Vector3Wide lanes are `Vector<float>`).
- Quaternion → 2D Z angle: `2 * Atan2(q.Z, q.W)` (CCW about +Z); screen rotation = negated.
- `CollidableReference.RawHandleValue` is the body-handle int; `BodyHandle.Value` likewise.
- Note: `SpringSettings.Continuous` does NOT exist — use `new SpringSettings(frequency, dampingRatio)`.

## Babylon.js v9 (`@babylonjs/core`, Game.UI package.json)

- Deep ESM imports only: `Engines/engine`, `scene`, `Cameras/arcRotateCamera`, `Lights/hemisphericLight`, `Maths/math.vector`, `Maths/math.color`, `Meshes/Builders/boxBuilder`, `Meshes/Builders/groundBuilder`, `Materials/standardMaterial`.
- `scene.clearColor` is a `Color4` (not `Color3`).
- `GridMaterial` is NOT in `@babylonjs/core` — use `StandardMaterial` (grid material lives in the separate materials package).
- `ArcRotateCamera` has built-in pointer/wheel orbit-zoom control via `attachControl(canvas, true)`.
- Babylon 9.25.0 currently installed.
- **Spector.js debug overlay:** append `?spector=1` to the URL. Spector.js loads on-demand via dynamic `import('spectorjs')` (tree-shaken from default prod bundle). After init, `window.__spector` exposes the `Spector` instance for AI agent inspection.

## Zero-copy bridge (unchanged by the 3D migration)

- C# writes batched snapshots into pinned `float[]` (`GCHandle.Alloc(..., Pinned)`) via `PinnedRenderBuffer` + `DirectRenderTransport`; JS reads `new Float32Array(heap.buffer, ptr, count)` (`notifyRender` → `runtime.localHeapViewF32()`).
- Signal layout: 6-float header (`seq, epoch, entityCount, stride, stepMs, tickMs`) + extras + entity records; strides pinned by `Game.Engine.Generators` (analyzer BNOBO001/002 + `GeneratedSignalLayout` `[ModuleInitializer]` assert + generated `scenes/generated/signalLayout.ts`).
- Browser host event handshake: `babylon-bundle-ready` (was `pixi-bundle-ready`).
- Playwright: `Game.Wasm` host binds port 5902 via `launchSettings.json` `applicationUrl` (or `ASPNETCORE_URLS` with `--no-launch-profile`); Chrome channel fallback `GAME_WEB_CHROME` → `executablePath`.