# Render Interpolation — Implementation Guide

> Reviewed blueprint for the authoritative-sim ← boundary → presentation interpolation math (C# ECS sim ← shared-memory bridge → TypeScript Babylon.js). The original dual-physics sections (Box2D.NET authoritative + box2d3-wasm presentation) the interpolation math below remains the pattern the Babylon game renderers will use (LERP over the float64 shared buffers). When code and prose disagree, verified files win.

## 1. Mathematical Foundation

The authoritative C# simulation runs a fixed timestep `Δt_sim` (e.g., 16.66 ms for 60 Hz). The Babylon v9 presentation runs at the display's variable rate (60/144/240 Hz). Mapping incoming snapshots directly onto meshes produces stepped motion whenever display Hz > sim Hz. The client therefore treats itself as a **delayed, state-buffering consumer** and evaluates each frame at a fractional progression `α` between the last two authoritative states:

```
α = (T_now − T_last_signal) / Δt_sim        (clamped to [0, 1] — no extrapolation)
P_render = P_prev + (P_curr − P_prev) × α    (LERP, per axis)
θ_render = θ_prev + wrap(θ_curr − θ_prev) × α  (shortest-path angular LERP)
```

Angular wrap must be applied before scaling with α, or bodies rotating across ±π will spin the long way round:

```typescript
let delta = curr.rotation - prev.rotation;
if (delta > Math.PI) delta -= Math.PI * 2;
else if (delta < -Math.PI) delta += Math.PI * 2;
rotation = prev.rotation + delta * alpha;
```

In 2D this is plain shortest-path angular LERP — **no quaternion SLERP** (that is a 3D-only concern).

**Derive `Δt_sim` from the signal, do not hardcode it.** The server owns the tick rate; ship it in the payload (`stepMs` in `SnakeRenderSignal`, `tickMs` in every signal). `snake.ts` does exactly this: `stepMs = Math.max(1, signalStepMs)` on ingest, `alpha = min(1, (performance.now() − lastSignalAt) / stepMs)` on draw. Hardcoding `16.666` breaks the moment the server tick changes.

## 2. State Buffering — the shipped pattern (per-entity `InterpState`)

⚠️ Do **not** copy the whole buffer per push (`this.previous = new Map(this.current)` allocates a fresh Map per snapshot — churn at 60 pushes/s × N entities). The shipped pattern keeps one in-place `InterpState` per entity, example:

```typescript
interface InterpState {
    prev: AsteroidSpriteState;
    curr: AsteroidSpriteState;
    at: number;              // performance.now() at ingest
}

const interp = new Map<number, InterpState>();
let lastSignalAt = performance.now();
const TICK_MS = 1000 / 60;  // fallback; prefer the signal's tickMs/stepMs

const ingest = (states: AsteroidSpriteState[]) => {
    const now = performance.now();
    lastSignalAt = now;
    const seen = new Set<number>();
    for (const state of states) {
        seen.add(state.id);
        const existing = interp.get(state.id);
        if (existing) {
            existing.prev = existing.curr;   // shift, no allocation
            existing.curr = state;
            existing.at = now;
        } else {
            // New entity: prev = curr → α-safe, renders at its spawn pose.
            interp.set(state.id, { prev: state, curr: state, at: now });
        }
    }
    for (const id of interp.keys()) {
        if (!seen.has(id)) interp.delete(id);  // despawn pruning
    }
};

const nowAlpha = () => Math.min(1, (performance.now() - lastSignalAt) / TICK_MS);
```

Why per-entity state instead of two global maps:

- **Spawn handling** — a first-seen entity must not interpolate from `(0,0)`.
- **Despawn pruning** — entities absent from a batch are removed the same tick.
- **Zero per-push allocation** — only the incoming signal array is new memory.

The ticker then interpolates once per frame and draws example:
(`game.ts` in `drawWorld`):

```typescript
const onTicker = (ticker: Ticker) => {
    const dt = Math.min(ticker.deltaMS / 1000, 1 / 30);  // clamp huge frame gaps
    const alpha = nowAlpha();
    for (const { prev, curr } of interp.values()) {
        const x = prev.x + (curr.x - prev.x) * alpha;
        const y = prev.y + (curr.y - prev.y) * alpha;
        // …shortest-path angular lerp for rotation, then draw…
    }
};
```

`dt` clamping (`Math.min(deltaMS/1000, 1/30)`) matters for any per-frame presentation system — a background-tab stall must not inject a multi-second physics jump.

## 3. JS presentation physics

> The **authoritative physics engine** is BepuPhysics2 inside the C# ECS loop, and the presentation layer is Babylon.js with presentation physics Havok, only use Havok when explicitic requested: 1. In a single player game. 2. Multiplayer with physics rendering interpolation on UI.  
> **Asymmetric rigidity:** authoritative bodies drive the presentation world; the presentation world never exerts forces back onto authoritative bodies. In the Havok world, mirrored authoritative entities use pure presentation bodies. Collision resolution was one-way: kinematic → dynamic. Force the Havok body to exactly match the interpolated C# state.

## 4. Interpolation Isolation Matrix

| Parameter | Authoritative Layer (C# / BepuPhysics2) | Presentation Layer (TS / Babylon.js) |
| --- | --- | --- |
| Execution domain | browser-wasm host (`Game.Wasm`, Mono WASM) | Browser main thread (Vite ESM bundle) |
| Clock / timestep | Fixed `Δt_sim` (60 Hz `EcsSimulation` / game sims) | Variable, V-Sync bounded (Babylon render loop) |
| Physics role | Gameplay mechanics, hitboxes, mass, contact events (Asteroids) | None — rendering only |
| Body mapping | `BodyHandle` ↔ Arch entity (`PhysicsBody` component) | Mesh pools / thin instances (target) |
| State output | Computes `S_n`, writes one batched signal per interval into the pinned buffer | Consumes `S_n`, buffers prev/curr, evaluates `(1−α)S_{n−1} + αS_n` |
| Interpolation | None | LERP translation, shortest-path angular LERP rotation |

Determinism corollary: the authoritative world uses deterministic single-threaded BepuPhysics2 (null `ThreadDispatcher`); no JS-side physics world exists.

## 5. `HEAPF32`/`HEAPF64` shared memory

Pinned shared-memory transfer is implemented: `GCHandle.Alloc(..., Pinned)` → `IntPtr` → `new Float64Array(wasmHeap, ptr, elementCount)` via `[JSImport]("notifyRender")` on the browser host. Every signal buffer is pure 64-bit (`sprite-move` and `transform3d` both carry 8-byte doubles); there is no scalar-size parameter. The desktop host (`Game.WinApp`) ships the same pinned span through a WebView2 shared buffer instead of a heap view. The buffer math is unchanged from the interpolation pattern: `ingest` reads prev/curr straight from stride-indexed scalars over a zero-copy view. Design the `InterpState` buffer so the snapshot *source* is swappable — never let JSON parsing leak into the interpolation loop itself.
