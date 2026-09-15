// Desktop (WebView2) counterpart of Game.Wasm's `js/wasm-interop.js`.
//
// The native AOT host runs the ECS/Bepu simulation and publishes committed signal
// buffers through WebView2 shared memory:
//
//   host -> script   `sharedbufferreceived`
//                    additionalData = { channel, seq, elementCount }
//                    getBuffer()    = ArrayBuffer over the shared mapping (Float64Array)
//   script -> host   chrome.webview.postMessage("connect:{game}" | "pause:1|0")
//
// The page never polls: signals are pushed, and every script-side view is released
// immediately after the synchronous dispatch, so consumers must copy out values they
// keep (the decoder builds a plain snapshot per frame).
//
// Note: `PostWebMessageAsArrayBuffer` does not exist in the WebView2 API surface
// (Microsoft.Web.WebView2.Core exposes PostWebMessageAsJson/AsString and
// PostSharedBufferToScript); the shared buffer is the binary channel.

const dbg = (...args) => console.log('[babylon-debug]', ...args);

const webview = window.chrome?.webview;

const provider = {
    _listeners: {},
    onSignal(eventName, onData) {
        if (!this._listeners[eventName]) this._listeners[eventName] = [];
        this._listeners[eventName].push(onData);
    },
    postCommand(path) {
        const match = path.match(/^\/api\/([a-z0-9-]+)\/(connect|start|reset|pause|resume)$/);
        if (!match) {
            console.warn('[babylon-debug] no sim command handler for', path);
            return;
        }
        const [, gameKey, verb] = match;
        switch (verb) {
            case 'connect':
                webview.postMessage(`connect:${gameKey}`);
                break;
            case 'pause':
                webview.postMessage('pause:1');
                break;
            case 'resume':
                webview.postMessage('pause:0');
                break;
            default:
                console.warn('[babylon-debug] unhandled sim command', path);
        }
    },
    close() {
        // Scene teardown: drop all buffer listeners so reloads never stack duplicates.
        this._listeners = {};
    }
};

function dispatch(eventName, values) {
    const listeners = provider._listeners[eventName];
    if (!listeners) return;
    for (const cb of listeners) cb(values);
}

if (!webview) {
    console.error(
        '[babylon-debug] window.chrome.webview unavailable — this bundle is served by Game.WinApp ' +
        '(WebView2) or the browser-wasm host; plain browsers must use the SSE bundle (`npm run build:web`).');
} else {
    webview.addEventListener('sharedbufferreceived', (event) => {
        const metadata = event.additionalData ?? {};
        const buffer = event.getBuffer();
        // Every signal buffer is pure 64-bit doubles — one typed-array path, no width branch.
        const values = new Float64Array(buffer);
        try {
            dispatch(metadata.channel, values);
        } finally {
            webview.releaseBuffer(buffer);
        }
    });
}

function registerProvider() {
    window.registerLocalBufferProvider(provider);
    dbg('webview2 provider registered, booting renderer');
    // Desktop host boots straight into the ECS scene: it is the demo of the native
    // C# simulation (the transform3d float64 buffer), whereas the browser host keeps
    // the Havok demo scene as its default landing page.
    void window.initGame('render-viewport', 'ecs');
}

if (typeof window.initGame === 'function' && typeof window.registerLocalBufferProvider === 'function') {
    registerProvider();
} else {
    window.addEventListener('babylon-bundle-ready', registerProvider, { once: true });
}
