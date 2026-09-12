let _provider = null;
let _exports = null;

export function notifyRender(eventName, bufferPtr, floatCount) {
    const runtime = globalThis.getDotnetRuntime(0);
    if (!runtime) return;
    const heap = runtime.localHeapViewF32();
    const floats = new Float32Array(heap.buffer, bufferPtr, floatCount);
    dispatchFloats(eventName, floats);
}

function dispatchFloats(eventName, floats) {
    if (_provider && _provider._listeners && _provider._listeners[eventName]) {
        for (const cb of _provider._listeners[eventName]) {
            cb(floats);
        }
    }
}

export function setupProvider(exports) {
    _exports = exports;
    _provider = {
        _listeners: {},
        onSignal(eventName, onData) {
            if (!this._listeners[eventName]) this._listeners[eventName] = [];
            this._listeners[eventName].push(onData);
        },
        postCommand(path) {
            // Command routing: `/api/{gameKey}/connect` (and future `/api/{gameKey}/...`)
            // dispatches in-process to SimHost — zero HTTP, zero serialization.
            const match = path.match(/^\/api\/([a-z0-9-]+)\/(connect|start|reset|pause|resume)$/);
            if (!match) {
                console.warn('[babylon-debug] no sim command handler for', path);
                return;
            }
            const [, gameKey, verb] = match;
            const bridge = _exports?.Game?.Wasm?.WasmInterop ?? {};
            if (verb === 'connect' && typeof bridge.ConnectGame === 'function') {
                bridge.ConnectGame(gameKey);
                return;
            }
            if (verb === 'pause' && typeof bridge.SetPaused === 'function') {
                bridge.SetPaused(true);
                return;
            }
            if (verb === 'resume' && typeof bridge.SetPaused === 'function') {
                bridge.SetPaused(false);
                return;
            }
            console.warn('[babylon-debug] unhandled sim command', path);
        },
        close() {
            // Scene teardown: drop all buffer listeners so reloads never stack
            // duplicate decoders on the same signal.
            this._listeners = {};
        }
    };

    if (typeof window.registerLocalBufferProvider === 'function') {
        window.registerLocalBufferProvider(_provider);
    } else {
        window.addEventListener('babylon-bundle-ready', () => {
            window.registerLocalBufferProvider(_provider);
        }, { once: true });
    }
}