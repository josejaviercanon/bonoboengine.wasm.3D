# ADR-012: Opt-in browser WebAssembly threading for BepuPhysics2

- **Status:** Rejected (spike completed 2026-09-15 — see Spike log)
- **Date:** 2026-09-15
- **Decision owner:** engine owner (requested the exploration)
- **Related:** `AGENTS.md` (`PHYSICS_MEMORY_STRICT`), `Game.Wasm.csproj` (`WasmThreads` opt-in), `docs/architecture/dev-workflow.md`

## Context

`AGENTS.md` (`PHYSICS_MEMORY_STRICT`) and the `Game.Engine.csproj` comment state that the browser-wasm host always runs `Simulation.Timestep` single-threaded (null `ThreadDispatcher`) because browser-wasm has no thread pool. The upstream BepuPhysics2 design expects an `IThreadDispatcher` to exploit hardware parallelism, and .NET can run WebAssembly with real threads (`WasmEnableThreads`, Web Workers + `SharedArrayBuffer`). The exploration was requested to decide the question with evidence instead of assumption.

Two facts discovered during the spike that bound the value:

1. **No active Bepu timestep call site exists.** `grep Timestep src/Game.Engine src/Game.Wasm src/Game.WinApp src/Game.Tests` returns nothing: the physics *library* is referenced and vendored, but the sims that consumed it (Asteroids and friends) were removed. There is currently no solver to parallelize.
2. **Multi-threaded WASM constrains JavaScript interop to the main thread.** `[JSImport]`/`[JSExport]` are main-thread-only with threading enabled (dotnet/runtime `src/mono/wasm/features.md`), and the generated runtime additionally rejects synchronous exports while managed code is not running on the calling thread.

## Decision

**Reject threading for the browser-wasm host.** Keep the default (and only supported) simulation configuration single-threaded with a null `ThreadDispatcher`:

- `Game.Wasm.csproj` keeps `WasmEnableThreads` behind an inert, documented `-p:WasmThreads=true` opt-in so the spike can be repeated without archaeology.
- No dispatcher injection seam is added to `SimulationHost`/sims; the "null `ThreadDispatcher` on browser-wasm" directive in `AGENTS.md` stands unchanged.
- Revisit only if (a) an authoritative Bepu solver lands in `Game.Engine` and profiling shows the solve is the frame-time bottleneck, **and** (b) the command bridge is migrated to asynchronous `[JSExport]` (`Task`-returning) calls.

## Spike evidence

| Step | Expectation | Result |
| --- | --- | --- |
| `dotnet build src/Game.Wasm -p:WasmThreads=true` (Debug) | worker runtime assets emitted | **PASS** — `_framework/dotnet.native.worker.*.mjs` present |
| `dotnet publish -c Release -p:WasmThreads=true` (AOT + trim) | AOT + threads compatible on .NET 10 | **PASS** — publish succeeded, worker assets + AOT wasm in `publish/wwwroot/_framework` |
| Serve with COOP/COEP, boot in Chrome | `crossOriginIsolated === true`, scene renders | **PARTIAL** — isolation true, runtime + Babylon bundle boot, canvas mounts; **scene never connects** |
| Command bridge under threads | `ConnectGame`/`SetPaused`/`SpawnEntity`/configuration delivery work | **FAIL** — every synchronous `[JSExport]` call throws `Error: Cannot call synchronous C# methods.` (thrown by `dotnet.runtime.js` when `isManagedRunningOnCurrentThread` is false) |

Observed console (published AOT build, Chrome, COOP/COEP server):

```
[babylon-debug] config load failed — engine defaults in use: Error: Cannot call synchronous C# methods.
    at Dn (…/dotnet.runtime.xevcx800hs.js)
    at loadConfiguration (…/main.mjs:32)
pageerror: Error: Cannot call synchronous C# methods.   ← postCommand → ConnectGame
```

The render-side `[JSImport] notifyRender` path (C# → JS) was never reached because no simulation could be connected.

## Consequences

- **Cost of the rejected option, if ever revisited:** convert `WasmInterop` verbs (`ConnectGame`, `SetPaused`, `LoadConfiguration`, `SpawnEntity`, `DespawnEntity`) to `Task`-returning exports; make the provider fire-and-forget promises; re-validate the known MT interop hangs (dotnet/runtime discussion #117698); serve every host (dev loop, Playwright, production) with COOP/COEP; re-scope determinism claims to "per worker count".
- **Kept as-is:** deterministic single-threaded solves, no isolation headers needed, no worker assets shipped, `Game.Tests` determinism contract unchanged.
- **Toolchain facts worth keeping:** `bin/<Configuration>/net10.0/wwwroot` is the build-time app shell; `bin/<Configuration>/net10.0/publish/wwwroot` is the complete static site. `browser-wasm/AppBundle` is not produced by this non-Blazor WebAssembly SDK project (recorded in `docs/ai-agents/codebase-truth.md`).
