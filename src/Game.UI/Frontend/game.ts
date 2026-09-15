import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Button } from '@babylonjs/gui/2D/controls/button';
import { StackPanel } from '@babylonjs/gui/2D/controls/stackPanel';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { getLocalBufferProvider, registerLocalBufferProvider, type LocalBufferProvider } from './signalSource';
import { createSinglePlayerScene } from './scenes/singlePlayer/sceneSinglePlayer';
import { createEcsScene } from './scenes/ecs/sceneECS';
import type { SceneHandle } from './scenes/types';

// Debug helper: every interop entry/exit point logs under one prefix so the
// whole pipeline is traceable from the browser console (F12).
const dbg = (...args: unknown[]) => console.log('[babylon-debug]', ...args);

type SceneName = 'singlePlayer' | 'ecs';

declare global {
    interface Window {
        /** `initialScene` defaults to 'singlePlayer'; the desktop host boots 'ecs'. */
        initGame: (containerId: string, initialScene?: SceneName) => Promise<void>;
        registerLocalBufferProvider: (provider: LocalBufferProvider) => void;
        __spector: unknown;
        __scene: unknown;
    }
}

interface SceneDefinition {
    /** SimHost game key — `/api/{gameKey}/connect` stops the old sim and starts this one. */
    gameKey: string;
    create: (engine: Engine, canvas: HTMLCanvasElement) => Promise<SceneHandle>;
}

const SCENES: Record<SceneName, SceneDefinition> = {
    singlePlayer: { gameKey: 'single-player', create: createSinglePlayerScene },
    ecs: { gameKey: 'transform3d', create: createEcsScene },
};

let engine: Engine | null = null;
let container: HTMLElement | null = null;
let canvas: HTMLCanvasElement | null = null;
let activeHandle: SceneHandle | null = null;

export async function initGame(containerId: string, initialScene: SceneName = 'singlePlayer'): Promise<void> {
    dbg('initGame called, containerId =', containerId, 'initialScene =', initialScene);

    container = document.getElementById(containerId);
    if (!container) {
        console.error(`[babylon-debug] container '#${containerId}' NOT found in DOM`);
        return;
    }
    dbg('container found, client size =', container.clientWidth, 'x', container.clientHeight);

    await new Promise((resolve) => setTimeout(resolve, 50));
    dbg('layout wait done, client size now =', container.clientWidth, 'x', container.clientHeight);

    if (container.clientWidth === 0 || container.clientHeight === 0) {
        console.warn(`[babylon-debug] render target '#${containerId}' has a 0px boundary. Forcing fallback dimensions.`);
        container.style.width = '100vw';
        container.style.height = '100vh';
    }

    canvas = document.createElement('canvas');
    canvas.id = 'render-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    engine = new Engine(canvas, true, { antialias: true, stencil: true, preserveDrawingBuffer: true });

    await switchScene(initialScene);

    engine.runRenderLoop(() => activeHandle?.scene.render());
    window.addEventListener('resize', () => engine?.resize());

    void initSpector(canvas);

    dbg('Babylon engine initialized:', engine.getClassName(), 'canvas', canvas.width, 'x', canvas.height);
}

/**
 * Unloads the active scene (closing its stream + disposing its resources),
 * routes the sim switch through SimHost (which stops the previous simulation
 * and starts the requested one), then builds the new scene. Reloading the same
 * scene restarts its simulation fresh.
 */
async function switchScene(name: SceneName): Promise<void> {
    if (activeHandle) {
        activeHandle.cleanup();
        activeHandle.scene.dispose();
        activeHandle = null;
    }

    postCommandToSim(`/api/${SCENES[name].gameKey}/connect`);

    const handle = await SCENES[name].create(engine!, canvas!);
    window.__scene = handle.scene;
    buildSceneSwitcherGui(handle.scene, name);

    activeHandle = handle;
    dbg('scene switched to', name);
}

/**
 * Routes a sim command through the in-process local-buffer provider when
 * present; falls back to an HTTP POST for SSE (web) bundles.
 */
function postCommandToSim(path: string): void {
    const provider = getLocalBufferProvider();
    if (provider?.postCommand) {
        provider.postCommand(path);
        return;
    }
    void fetch(path, { method: 'POST' }).catch((err) => {
        console.error(`[babylon-debug] sim command ${path} failed:`, err);
    });
}

/** Top bar with the scene-switcher buttons (Babylon 2D GUI, rebuilt per scene). */
function buildSceneSwitcherGui(scene: Scene, current: SceneName): void {
    const gui = AdvancedDynamicTexture.CreateFullscreenUI('scene-switcher', true, scene);
    gui.idealWidth = 1920;

    const panel = new StackPanel('scene-buttons');
    panel.isVertical = false;
    panel.width = '340px';
    panel.height = '40px';
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    panel.top = '12px';
    panel.left = '0px';

    const names: SceneName[] = ['singlePlayer', 'ecs'];
    for (const name of names) {
        const button = Button.CreateSimpleButton(`btn-${name}`, name === 'singlePlayer' ? 'Single Player' : 'ECS Scene');
        button.width = '150px';
        button.height = '40px';
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        button.color = name === current ? '#f97316' : '#e2e8f0';
        button.background = name === current ? '#1e293b' : '#334155';
        button.cornerRadius = 8;
        button.fontSize = 16;
        button.paddingLeft = '16px';
        button.paddingRight = '16px';
        button.onPointerClickObservable.add(() => {
            void switchScene(name);
        });
        panel.addControl(button);
    }

    gui.addControl(panel);
}

/**
 * On-demand Spector.js WebGL inspector (debug tooling for AI agent inspection).
 * Activated only when `?spector=1` is present in the URL query string. The
 * dynamic import is tree-shaken out of the default production bundle, loading
 * as a separate chunk only when the flag is set.
 */
async function initSpector(_canvas: HTMLCanvasElement): Promise<void> {
    if (!new URLSearchParams(location.search).has('spector')) return;
    dbg('?spector=1 detected — booting Spector.js debug UI');
    try {
        const { Spector } = await import('spectorjs');
        const spector = new Spector();
        spector.displayUI();
        window.__spector = spector;
        dbg('Spector.js active');
    } catch (err) {
        console.error('[babylon-debug] Spector.js init failed:', err);
    }
}

dbg('game-bundle loaded, exposing window.initGame');

window.initGame = initGame;
// The co-located Game.Wasm host registers its in-process
// command/signal bridge through this global (see wwwroot/index.html of that host).
window.registerLocalBufferProvider = registerLocalBufferProvider;

// Module evaluation finished — all globals above exist. The Game.Wasm host
// listens for this event instead of polling for registerLocalBufferProvider.
window.dispatchEvent(new Event('babylon-bundle-ready'));