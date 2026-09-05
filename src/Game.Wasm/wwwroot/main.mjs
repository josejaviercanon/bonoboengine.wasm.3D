import { dotnet } from './_framework/dotnet.js';
import { notifyRender, setupProvider } from './js/wasm-interop.js';

const dbg = (...args) => console.log('[babylon-debug]', ...args);

// Welcome modal: click Continue to enable audio and dismiss. Attached BEFORE any
// top-level await (the WASM runtime boots for seconds) so an early click is never lost.
const welcomeModal = document.getElementById('welcome-modal');
const continueBtn = document.getElementById('welcome-continue');
if (welcomeModal && continueBtn) {
    continueBtn.addEventListener('click', () => {
        // Unlock audio context (browser autoplay policy)
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            const ctx = new AudioContext();
            ctx.resume().catch(() => {});
        }
        welcomeModal.style.display = 'none';
    });
}

// Bootstrap .NET runtime
const runtime = await dotnet.withApplicationArguments("start").create();
const { setModuleImports, getAssemblyExports, getConfig, runMain } = runtime;

// Register the interop module BEFORE runMain so C# [JSImport] can find it
setModuleImports('WasmInterop', { notifyRender });

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);

// Register local-buffer provider with the Babylon bundle (command routing + signals)
setupProvider(exports);

// Run C# Main() — initializes SimHost
await runMain();

// Build toolbar UI from the C# catalog
const exampleList = JSON.parse(exports.Game.Wasm.WasmInterop.ListExamples());
const groups = [...new Set(exampleList.map(e => e.group))];
const games = exampleList.filter(e => e.group === 'Games');

function buildToolbar() {
    const toolbar = document.createElement('div');
    toolbar.style.cssText =
        'position:fixed;top:0;left:0;right:0;background:rgba(15,23,42,0.9);padding:0.75rem 1rem;' +
        'color:#fff;z-index:10;display:flex;justify-content:space-between;align-items:center;' +
        'gap:1rem;border-bottom:1px solid #1e293b;';

    const left = document.createElement('div');
    left.style.cssText = 'display:flex;align-items:center;gap:1rem;min-width:0;flex-wrap:wrap;';

    const title = document.createElement('span');
    title.style.cssText = 'font-size:0.75rem;color:#94a3b8;';
    title.textContent = 'Bonobo Engine — Babylon.js';
    left.appendChild(title);

    // Game selector
    const gameSelect = document.createElement('select');
    gameSelect.id = 'game-select';
    gameSelect.style.cssText =
        'background:#0f172a;color:#e2e8f0;border:1px solid #334155;' +
        'border-radius:0.375rem;padding:0.375rem 0.5rem;font-size:0.875rem;';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select a game…';
    gameSelect.appendChild(placeholder);
    for (const g of games) {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = g.title;
        gameSelect.appendChild(opt);
    }
    left.appendChild(gameSelect);

    // Selection handler: switch game sim first, then fetch payload. 3D game
    // renderers land in a later iteration — the sim runs headless for now.
    const onSelect = (id) => {
        exports.Game.Wasm.WasmInterop.SwitchGame(id);
        const payload = exports.Game.Wasm.WasmInterop.GetExamplePayload(id);
        if (typeof window.renderScene === 'function') {
            void window.renderScene(payload);
        }
    };
    gameSelect.addEventListener('change', () => onSelect(gameSelect.value));

    toolbar.appendChild(left);
    document.body.prepend(toolbar);

    return { gameSelect };
}

const { gameSelect } = buildToolbar();

// Wait for the Babylon bundle then init the canvas (shared 3D scene, no game renderer yet)
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