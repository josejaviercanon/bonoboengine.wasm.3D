let _provider = null;

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

export function setupProvider(_exports) {
    _provider = {
        _listeners: {},
        onSignal(eventName, onData) {
            if (!this._listeners[eventName]) this._listeners[eventName] = [];
            this._listeners[eventName].push(onData);
        },
        close() {}
    };

    if (typeof window.registerLocalBufferProvider === 'function') {
        window.registerLocalBufferProvider(_provider);
    } else {
        window.addEventListener('babylon-bundle-ready', () => {
            window.registerLocalBufferProvider(_provider);
        }, { once: true });
    }
}