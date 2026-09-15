# Verified API Facts (bonoboengine.wasm.3D)

Verified against the checked-in sources. When prose docs and these facts disagree, code wins.

## BepuPhysics2 (vendored `src/bepuphysics2`, net10.0)

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

## Zero-copy bridge (scalar-typed: float32 + float64)

- C# writes batched signals into a pinned array (`GCHandle.Alloc(..., Pinned)`) via `PinnedRenderBuffer<T>` + `DirectRenderTransport<TSignal, T>`.
  - Browser (`Game.Wasm`): JS reads `new Float32Array/Float64Array(heap.buffer, ptr, count)` (`notifyRender(eventName, ptr, elementCount, scalarSize)` → `runtime.localHeapViewF32()`/`localHeapViewF64()`). `scalarSize` comes from the C# `[TypeScriptExport]` precision (4 = float, 8 = double).
  - Desktop (`Game.WinApp`): host copies the pinned span into `CoreWebView2SharedBuffer` (3-buffer rotation) and calls `PostSharedBufferToScript(buffer, CoreWebView2SharedBufferAccess.ReadOnly, "{\"channel\":...,\"seq\":...,\"elementCount\":...,\"scalarSize\":...}")`; page gets `sharedbufferreceived` → `new Float64Array(event.getBuffer())` → dispatch → `chrome.webview.releaseBuffer(buffer)`.
- `PostWebMessageAsArrayBuffer` does **not** exist in `Microsoft.Web.WebView2.Core` (verified in the 1.0.3719.77 projection: only `PostWebMessageAsJson`/`AsString` + `PostSharedBufferToScript`).
- `CoreWebView2SharedBuffer.OpenStream()` returns `Windows.Storage.Streams.IRandomAccessStream` (WinRT projection) — adapt with `System.IO.WindowsRuntimeStreamExtensions.AsStream()`. `CoreWebView2Environment.CreateAsync` parameter names are dropped by the projection, and `EnsureCoreWebView2Async` may only be called once (set `WEBVIEW2_USER_DATA_FOLDER` instead of swapping environments).
- Signal layout: 6-element header (`seq, epoch, entityCount, stride, stepMs, tickMs`) + entity records, one scalar per field. `SignalBufferLayout`: `EcsStride = 6` / `EcsScalarSize = 4` (sprite-move, float32) and `Transform3DStride = 11` / `Transform3DScalarSize = 8` (transform3d, float64). Strides and scalar sizes pinned by `Game.Engine.Generators` (analyzer BNOBO001/002/003 + `GeneratedSignalLayout` `[ModuleInitializer]` assert + generated `scenes/generated/signalLayout.ts`).
- Host-agnostic simulation control: `Game.Engine.ECS.SimulationHost` with `BufferNotify(string eventName, nint bufferPtr, int elementCount, int scalarSize)`. **The pointer is host-width**: `int` truncates the pinned address on the native x64 host and crashes the AOT process (fail-fast `0xC0000409`) — keep `nint`, cast to `int` only for the JSImport (`WasmInterop.Notify`, 32-bit WASM heap). The WinApp callback coalesces to the newest frame and marshals to the UI thread before posting.
- Browser host event handshake: `babylon-bundle-ready`. Desktop host needs no handshake: `webview-bridge.js` registers the provider as soon as `window.registerLocalBufferProvider`/`window.initGame` exist.
- Playwright: `Game.Wasm` host binds port 5902 via `launchSettings.json` `applicationUrl` (or `ASPNETCORE_URLS` with `--no-launch-profile`); Chrome channel fallback `GAME_WEB_CHROME` → `executablePath`. The WinApp desktop host is not covered by Playwright.
- Frontend assets: `src/Game.UI/wwwroot/dist` is untracked; hosts copy it through `src/Game.UI/Game.UIAssets.targets` (`GameUIAssetsMode=ProjectWwwroot|OutputFolder`), which prunes before copying and fails fast when `dist/game-bundle.js` is missing.