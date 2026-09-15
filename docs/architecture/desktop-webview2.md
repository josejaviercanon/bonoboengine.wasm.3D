# Desktop Host — WinUI 3 + WebView2 + Native AOT (`Game.WinApp`)

> Companion to `docs/architecture/topology.md`. The browser host (`Game.Wasm`) is documented in `docs/index.md`; this file covers the Windows desktop host only.

## What it is

`src/Game.WinApp` is a WinUI 3 (Windows App SDK) application that hosts the **same** Babylon.js bundle as the browser host in a WebView2 control. The native AOT process runs the authoritative `Game.Engine` ECS/Bepu simulation in-process and streams committed transform buffers into the page through WebView2 shared memory.

```
C# (native AOT, Game.WinApp process)                 WebView2 renderer process
  Transform3DEcsSimulation (60 Hz timer)
    └─ DirectRenderTransport<TSignal, double>
         └─ PinnedRenderBuffer<double>  (GCHandle pinned)
              └─ SimulationHost.BufferNotify(event, nint ptr, count)
                   └─ SharedBufferChannel.Post(ptr, count)      ← UI thread
                        ├─ copy into rotating CoreWebView2SharedBuffer
                        └─ PostSharedBufferToScript(ReadOnly, {channel,seq,...})
                                                              │
                                                              ▼
                                        chrome.webview 'sharedbufferreceived'
                                          └─ new Float64Array(e.getBuffer())
                                               └─ provider.onSignal(channel, ...)
                                                    └─ decodeTransform3D → mesh pool
                                          └─ chrome.webview.releaseBuffer(buffer)
```

The page boots straight into the **ECS scene** (`initGame('render-viewport', 'ecs')` in
`webview-bridge.js`) — that is the desktop demo of the native C# simulation. The browser host
keeps the Havok `singlePlayer` scene as its default.

### Pointer width (verified gotcha)

`SimulationHost.BufferNotify` carries the pinned address as **`nint`**. An earlier revision used
`int` (fine on the 32-bit WASM heap); on the native x64 host the address truncated and the first
copy crashed the process with a fail-fast (`0xC0000409`) inside the AOT binary. Keep the delegate
host-width and cast to `int` only where the JSImport contract requires it (`WasmInterop.Notify`).

## Architecture rules it satisfies

- **Zero-copy / no JSON on the hot path.** The bulk payload is shared memory (`CoreWebView2Environment.CreateSharedBuffer`); only a tiny metadata string (`channel`, `seq`, `elementCount`) rides with each post. No per-entity interop, no serialized transforms.
- **Authoritative C#.** The page never simulates; it only consumes buffers and sends low-frequency commands.
- **Fixed-step decoupling.** The simulation ticks on a `System.Threading.Timer` (60 Hz); the WebView2 post happens on the UI thread via a coalescing dispatcher hop, and Babylon renders on `requestAnimationFrame`.

### Why not `PostWebMessageAsArrayBuffer`

That API does not exist in the WebView2 surface. Verified against `Microsoft.Web.WebView2.Core` (1.0.3719.77, the version Windows App SDK 2.4 resolves): the only binary channel is `PostSharedBufferToScript`; the web-message APIs are `PostWebMessageAsJson`/`PostWebMessageAsString` (JSON/string only, plus optional DOM objects). The shared buffer is strictly better anyway: the page reads the same memory page the host wrote — no per-frame copy of the payload.

## Channel protocol

| Direction | Mechanism | Payload |
| --- | --- | --- |
| host → page | `CoreWebView2.PostSharedBufferToScript(buffer, ReadOnly, additionalDataAsJson)` | `{ "channel": "transform3d", "seq": N, "elementCount": E }` |
| page → host | `chrome.webview.postMessage("connect:transform3d" \| "pause:1" \| "pause:0")` | primitive verb string (`CoreWebView2.WebMessageReceived` → `TryGetWebMessageAsString()`) |

Page-side contract (`wwwroot/js/webview-bridge.js`):

- Buffers are **only valid inside the listener callback**. The bridge releases the view immediately after the synchronous dispatch, so decoders must copy out what they keep (`decodeTransform3D` builds a plain snapshot).
- Every signal buffer is pure 64-bit: the bridge always wraps the mapping in a `Float64Array` — there is no scalar-size branch (the shared-memory ABI carries no width).
- The provider implements the same `LocalBufferProvider` interface as the WASM host, so the Babylon bundle is host-agnostic.

Host-side rules (`SharedBufferChannel`):

- Three buffers rotate per channel: the renderer may still be reading frame N while the simulation writes N+1; ~3 frames of slack is plenty at 60 Hz.
- Buffers are created lazily on the first signal for that channel, at `SimulationHost`'s capacity constants, and re-created (all three) if a signal outgrows them.
- `Free()` on `Shutdown()` disposes the streams and shared buffers (called from `MainWindow.Closed`).

## Frontend assets

The WinApp project imports `src/Game.UI/Game.UIAssets.targets` with `GameUIAssetsMode=OutputFolder`:

- `CopyGameUIAssets` runs `BeforeTargets="Build"` and copies `dist/`, `assets/`, `audio/`, `games/` and `background.png` into `$(OutDir)wwwroot` after pruning those folders. Project-wwwroot copies are wrong for WinUI: `Content` globs are evaluated at project load, so files created during the build would be missed (and stray copies in the project tree would be picked up as resources).
- `CopyGameUIAssetsToPublish` mirrors the output into `$(PublishDir)wwwroot` after `Publish`.
- A missing `Game.UI/wwwroot/dist/game-bundle.js` fails the build with an instructive error; pass `-p:BuildFrontend=true` to run `npm run build` first.

The page shell is `src/Game.WinApp/wwwroot/index.html` + `wwwroot/js/webview-bridge.js` (tracked); it loads `dist/game-bundle.js` + `dist/app.css` through the `babylon.local` virtual host mapping.

## Publish (native machine code)

```powershell
npm run build   # or -p:BuildFrontend=true
dotnet publish src/Game.WinApp/Game.WinApp.csproj -c Release -r win-x64 -p:Platform=x64 -p:BuildFrontend=true
# → src/Game.WinApp/bin/Release/net10.0-windows10.0.26100.0/win-x64/publish/Game.WinApp.exe (+ wwwroot/)
```

Release project settings that make this work:

- `PublishAot=true`, `OptimizationPreference=Speed`.
- `WindowsPackageType=None` + `WindowsAppSDKSelfContained=true` + `SelfContained=true` → unpackaged, self-contained, no MSIX signing (Debug keeps the packaged identity for F5).
- `PublishReadyToRun=false` whenever `PublishAot=true` (unsupported combination).
- `NoWarn=IL3050` (Release only): vendored Arch ECS reports its non-generic `ComponentRegistry.SizeOf(Type)` reflection fallback, which the engine never calls (all registration goes through the generic overloads).

The machine needs the Edge **WebView2 runtime** (ships with current Windows). No .NET runtime is required on the target machine (AOT).

## Manual smoke checklist

Playwright covers the browser host only; use this for the desktop host:

1. `dotnet run --project src/Game.WinApp/Game.WinApp.csproj` (Debug) or launch the published exe.
2. The window shows the Babylon page fullscreen; the **ECS scene** boots automatically and 12 spheres move/spin/scale continuously (the `transform3d` float64 buffer is flowing).
3. In the page DevTools console (`F12` → Console): no `[babylon-debug]` errors; the top bar scene switcher can still switch to `Single Player`.
4. Close the window: the process exits without lingering `Game.WinApp.exe` (WebView2 child processes may take a moment).

### Automated check via CDP

WebView2 accepts Chromium remote-debugging flags through the
`WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS` environment variable, so an agent can attach with
Playwright's `chromium.connectOverCDP('http://127.0.0.1:9223')` and evaluate JS in the page —
this is how the float64 pipeline was verified (mesh pool visible + transforms changing between
two samples, zero console errors).

```powershell
$env:WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS = '--remote-debugging-port=9223'
.\src\Game.WinApp\bin\Release\net10.0-windows10.0.26100.0\win-x64\publish\Game.WinApp.exe
# then, from a Node script: connectOverCDP → page.evaluate(() => window.__scene) → read mesh transforms
```

Note: Debug builds are **not** self-contained, so launching the Debug exe directly fails in
`WindowsAppSDK` auto-initialization (`COMException 0x80040154`, class not registered) — use
`dotnet run`/F5 (which deploys the framework package) or the Release publish for manual runs.

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Blank white page | `wwwroot` missing next to the exe → build with the asset targets (the publish folder must contain `wwwroot/index.html`). |
| Page loads, no animation after clicking ECS Scene | Check the console for `window.chrome.webview unavailable` (page opened outside WebView2) or `no signal stream` (the bridge registered after the bundle booted). The ECS buttons send `connect:transform3d`, which requires `SimulationHost.Connect`. |
| `HResult 0x8007139F`/`RO_E_CLOSED` when posting | A shared buffer was closed while still posted — keep the `CoreWebView2SharedBuffer` instances alive for the lifetime of the page (that is what `SharedBufferChannel` does). |
| Renderer access violation | The buffer was posted as modifiable (`CoreWebView2SharedBufferAccess` other than `ReadOnly`) and the page wrote to it. Always post `ReadOnly`. |
| Build warns `PRI249 Invalid qualifier: PURE-…` | Stray frontend copies landed in the **project** `wwwroot` and MRT indexed the Vite chunk names as resource qualifiers. Delete `src/Game.WinApp/wwwroot/dist|audio|games` and rebuild — OutputFolder mode never writes there. |
