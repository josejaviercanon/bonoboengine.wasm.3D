# Dev Workflow: one terminal, three watchers

`npm run dev` (in `src/Game.UI`) starts the co-located browser host plus both frontend
watchers and mirrors the Game.UI asset folders into `Game.Wasm/wwwroot` as they change.

```
src/Game.UI/scripts/dev.mjs
├── dotnet watch run --project src/Game.Wasm --no-launch-profile   → http://localhost:5902
├── vite build --watch      (Frontend/**  → wwwroot/dist/game-bundle.js + chunks)
├── tailwind --watch        (Frontend/app.css → wwwroot/dist/app.css)
└── fs.watch(wwwroot/**)    → copies dist/ assets/ audio/ games/ into Game.Wasm/wwwroot
```

## Why no Vite dev server

The frontend is a **library-mode** bundle (`vite.config.ts` → `formats: ['es']`), not a
standalone app. The page shell (`index.html`, `main.mjs`, `_framework/dotnet.js`) belongs
to the host, and the WinApp desktop host consumes the exact same bundle. A Vite dev server
would have to re-implement the host shell, serve `_framework` out of the C# build output
and diverge from the production path; the watcher+`dotnet watch` loop keeps the shipped
pipeline authoritative.

## Loop behaviour

| Edit | What happens |
| --- | --- |
| `Frontend/**/*.ts`, `Frontend/app.css` | Vite/Tailwind write `wwwroot/dist`, the dev script copies it into `Game.Wasm/wwwroot`, hard-reload the page (no HMR). |
| `src/Game.Engine/**`, `src/Game.Wasm/**` C# | `dotnet watch` rebuilds, re-runs `CopyGameUIAssets`, restarts the host. Reload the page. |
| `src/Game.UI/wwwroot/assets/**` | Copied verbatim into both hosts' `wwwroot/assets` by the dev script and by `Game.UIAssets.targets` on every build. |
| `src/Game.UI/wwwroot/{audio,games}/**`, `background.png` | Same copy path as production. |

`Game.Wasm.csproj` removes `wwwroot/{dist,assets,audio,games}` from the `Watch` item so the
dev-script copies can never retrigger `dotnet watch` (that would be an infinite rebuild loop).
Only game code drives rebuilds.

## Manual alternatives

```powershell
# Terminal 1 — host (rebuild on C# change)
dotnet watch run --project src/Game.Wasm --no-launch-profile

# Terminal 2 — frontend (rebuild on TS/CSS change; then rebuild the host or copy dist/)
cd src/Game.UI
npm run watch:js
npm run watch:css
```

Production builds never use the dev script: `-p:BuildFrontend=true` runs `npm run build`
inside `Game.UIAssets.targets` (see `AGENTS.md` → Commands).

## Threaded builds

If the browser-wasm host is built with `-p:WasmThreads=true`, the app must be served with
`Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`,
otherwise the runtime cannot obtain a `SharedArrayBuffer`. See
`docs/adr/ADR-012-wasm-multithreading.md`.
