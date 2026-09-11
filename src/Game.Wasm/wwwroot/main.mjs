import { dotnet } from './_framework/dotnet.js';
import { notifyRender, setupProvider } from './js/wasm-interop.js';

const dbg = (...args) => console.log('[babylon-debug]', ...args);

// Bootstrap .NET runtime
const runtime = await dotnet.withApplicationArguments("start").create();
const { setModuleImports, getAssemblyExports, getConfig, runMain } = runtime;

// Register the interop module BEFORE runMain so C# [JSImport] can find it
setModuleImports('WasmInterop', { notifyRender });

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);

// Register local-buffer provider with the Babylon bundle (command routing + signals)
setupProvider(exports);

// Run C# Main() — minimal interop bootstrap
await runMain();

// Wait for the Babylon bundle then init the demo scene canvas
async function bootRenderer() {
    if (typeof window.initGame !== 'function') {
        await new Promise(resolve => {
            const check = () => {
                if (typeof window.initGame === 'function' && document.getElementById('render-viewport')) {
                    resolve();
                } else {
                    setTimeout(check, 50);
                }
            };
            check();
        });
    }
    await window.initGame('render-viewport');
}

await bootRenderer();