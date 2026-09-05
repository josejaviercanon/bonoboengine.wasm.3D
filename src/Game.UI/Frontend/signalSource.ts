// Compile-time render-source selection — the frontend half of ADR-007's flag
// compilation (C# half: `IsMultiplayer`/`IsEcsServerSide` → `SINGLE_PLAYER_LOCAL`).
//
// `__RENDER_SOURCE__` is replaced textually by Vite `define` (see vite.config.ts)
// BEFORE bundling tree-shaking, so the transport branch that is not selected is
// dead-code-eliminated from the dist bundle:
//   npm run build        → 'local-buffer' (co-located Game.Wasm host — DEFAULT,
//                          matches the C# SINGLE_PLAYER_LOCAL default)
//   npm run build:web    → 'sse'          (Game.Web static-SSR + SSE bridge, multiplayer)
//
// Never call `fetch` from a scene; always route input/start/reset/config commands
// through `SignalStream.postCommand`.

export type RenderSource = 'sse' | 'local-buffer';

declare global {
    // eslint-disable-next-line no-var
    const __RENDER_SOURCE__: RenderSource;
}

/** Scene CONST: which transport feeds snapshots into the interpolation layer. */
export const RENDER_SOURCE: RenderSource = __RENDER_SOURCE__;

/** Uniform handle over the selected transport; created by `connectSignalStream`. */
export interface SignalStream {
    /** Subscribe to one named signal (SSE event name today); `data` is raw JSON. */
    addSignalListener(eventName: string, onData: (data: string) => void): void;
    /**
     * Subscribe to one named signal as a raw float32 buffer (ADR-007 Phase 3).
     * Only ever fires in `local-buffer` builds — the SSE-branch stub is a no-op.
     */
    addBufferListener(eventName: string, onData: (floats: Float32Array) => void): void;
    /**
     * Send one player/game command to the simulation (input, start, reset,
     * pause, config…). The ONLY way a scene may talk to the sim.
     */
    postCommand(path: string, bodyJson?: string): Promise<void>;
    /** Tear the stream down (EventSource.close / provider close). */
    close(): void;
    /** Called when the stream is interrupted; SSE reconnects automatically. */
    onInterrupted(handler: () => void): void;
}

/**
 * The co-located WASM host registers a typed-array bridge here (ADR-007
 * Phase 2/3): every signal is delivered as the Float32Array view over the
 * pinned shared buffer written by `DirectRenderTransport`, and every command
 * is a direct in-process call into the sim's public API (`QueueInput`,
 * `Start`, `Reset`, …) keyed by the same `path` the SSE branch would POST to.
 */
export interface LocalBufferProvider {
    onSignal(eventName: string, onData: (floats: Float32Array) => void): void;
    /** Direct command: dispatch `path` to the sim in-process, zero HTTP. */
    postCommand?(path: string, bodyJson?: string): void;
    /** One-shot scene-boot setup (e.g. racer best-lap re-injection). */
    setupRacerInitialFastLap?(seconds: number): void;
    close?(): void;
}

let localBufferProvider: LocalBufferProvider | null = null;

export function registerLocalBufferProvider(provider: LocalBufferProvider): void {
    localBufferProvider = provider;
}

/**
 * Returns the raw local-buffer provider (or null in SSE bundles) so a scene
 * can reach one-shot setup methods like `setupRacerInitialFastLap`. The
 * provider is set by the co-located WASM host before any scene boots.
 */
export function getLocalBufferProvider(): LocalBufferProvider | null {
    return localBufferProvider;
}

export function connectSignalStream(url: string | undefined): SignalStream | null {
    if (__RENDER_SOURCE__ === 'sse') {
        if (!url) return null;
        const source = new EventSource(url);
        return {
            addSignalListener: (eventName, onData) => {
                source.addEventListener(eventName, (event) =>
                    onData((event as MessageEvent<string>).data));
            },
            // SSE builds carry no typed-array source; registered buffer
            // listeners simply never fire (see SignalStream.addBufferListener).
            addBufferListener: () => { /* no-op in SSE bundles */ },
            // SSE: input goes over HTTP — C# is the sole authority.
            postCommand: async (path, bodyJson) => {
                const response = await fetch(path, {
                    method: 'POST',
                    headers: bodyJson !== undefined ? { 'Content-Type': 'application/json' } : undefined,
                    body: bodyJson,
                });
                if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
            },
            close: () => source.close(),
            onInterrupted: (handler) => { source.onerror = () => handler(); }
        };
    }

    // 'local-buffer' branch (default): exists only when the co-located
    // Game.Wasm host registered a provider. `url` is irrelevant in-process.
    const provider = localBufferProvider;
    if (!provider) {
        console.error(
            '[babylon-debug] RENDER_SOURCE is "local-buffer" but no local buffer provider is registered. ' +
            'This bundle must be served by the co-located Game.Wasm host (ADR-007 Phase 2/3). ' +
            'Either run it under that host, or rebuild the frontend with `npm run build:web` (SSE mode).');
        return null;
    }
    const stream: SignalStream = {
        // No JSON-text path in local-buffer bundles; registered text listeners
        // simply never fire (the buffer listener is the live one).
        addSignalListener: () => { /* no-op in local-buffer bundles */ },
        addBufferListener: (eventName, onData) => provider.onSignal(eventName, onData),
        // local-buffer: direct in-process calls — zero HTTP, zero serialization.
        postCommand: async (path, bodyJson) => {
            if (!provider.postCommand) {
                console.warn(`[babylon-debug] local provider has no command handler for ${path}`);
                return;
            }
            provider.postCommand(path, bodyJson);
        },
        close: () => provider.close?.(),
        onInterrupted: () => { /* in-memory bridge never disconnects */ }
    };
    // Lazily create the matching simulation on the co-located host (ADR-007
    // Phase 2): unvisited games never start their 60 Hz timers.
    postConnectHandshake(stream, url);
    return stream;
}

/**
 * ADR-007 Phase 2: the co-located host creates simulations lazily, so each
 * scene announces itself on connect. In SSE bundles this helper does nothing
 * (the server sims always run).
 */
function postConnectHandshake(stream: SignalStream, url: string | undefined): void {
    if (__RENDER_SOURCE__ !== 'local-buffer') return;
    const gameKey = url?.match(/^\/?api\/([a-z-]+)\/stream$/)?.[1];
    if (!gameKey) return;
    void stream.postCommand(`/api/${gameKey}/connect`);
}