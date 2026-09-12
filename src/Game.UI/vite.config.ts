import { defineConfig } from 'vite';
import { resolve } from 'path';

// Compile-time render-source flag: 'local-buffer' (DEFAULT —
// co-located Game.Wasm host, matches the C# SINGLE_PLAYER_LOCAL default) or
// 'sse' (`vite build --mode web` — Game.Web static-SSR bridge, multiplayer).
// `define` replaces the identifier before bundling so the unused transport
// branch is tree-shaken away. `fetch` POST ships only in 'web' mode bundles.
const renderSource = (mode: string) => (mode === 'web' ? 'sse' : 'local-buffer');

export default defineConfig(({ mode }) => ({
    define: {
        __RENDER_SOURCE__: JSON.stringify(renderSource(mode))
    },
  resolve: {
    alias: {
      // Use the UMD build of @babylonjs/havok: its ESM entry embeds the
      // wasm as a base64 blob via new URL(..., import.meta.url), which Vite
      // inlines into game-bundle.js (~3 MB dead weight). The UMD build
      // fetches HavokPhysics.wasm at runtime instead; the binary ships
      // alongside the bundle via the build:js copy step and locateFile.
      '@babylonjs/havok': resolve(__dirname, 'node_modules/@babylonjs/havok/lib/umd/HavokPhysics_umd.js')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'Frontend/game.ts'),
      name: 'GameViewport',
      fileName: 'game-bundle',
      // ES module: Babylon.js ships ESM; loaded via <script type="module">.
      formats: ['es']
    },
    outDir: resolve(__dirname, 'wwwroot/dist'), // Exports directly to Blazor assets
    emptyOutDir: true,
    sourcemap: true
  }
}));