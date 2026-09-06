import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { registerLocalBufferProvider, type LocalBufferProvider } from './signalSource';

// Debug helper: every interop entry/exit point logs under one prefix so the
// whole pipeline is traceable from the browser console (F12).
const dbg = (...args: unknown[]) => console.log('[babylon-debug]', ...args);

declare global {
    interface Window {
        initGame: (containerId: string) => Promise<void>;
        renderText: (message: string) => void;
        renderScene: (message: string) => Promise<void>;
        registerLocalBufferProvider: (provider: LocalBufferProvider) => void;
        __spector: unknown;
    }
}

let engine: Engine | null = null;
let scene: Scene | null = null;
let container: HTMLElement | null = null;

export async function initGame(containerId: string): Promise<void> {
    dbg('initGame called, containerId =', containerId);

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

    // Babylon.js 9 — WebGL2 (WebGPU opt-in). The canvas is sized by Babylon and
    // appended into the host container; the simulation keeps ticking headless in
    // C# while the scene renders the shared-memory entity buffer (future game
    // renderers read the Float32Array bridge via signalSource.ts).
    const canvas = document.createElement('canvas');
    canvas.id = 'render-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    engine = new Engine(canvas, true, { antialias: true, stencil: true, preserveDrawingBuffer: true });
    scene = new Scene(engine);
    scene.clearColor = new Color4(0.012, 0.016, 0.031, 1);

    // ArcRotate camera: orbit + zoom + pan (built-in pointer/wheel control).
    const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 3, 24, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.minZ = 0.1;
    camera.maxZ = 500;

    const light = new HemisphericLight('light', new Vector3(0.4, 1, 0.2), scene);
    light.intensity = 0.9;

    // Minimal identifiable 3D content: floor + floating cube.
    const ground = CreateGround('ground', { width: 40, height: 40 }, scene);
    const groundMat = new StandardMaterial('ground-mat', scene);
    groundMat.diffuseColor = new Color3(0.07, 0.1, 0.2);
    groundMat.specularColor = new Color3(0.02, 0.02, 0.02);
    ground.material = groundMat;

    const box = CreateBox('demo-box', { size: 2 }, scene);
    const boxMat = new StandardMaterial('box-mat', scene);
    boxMat.diffuseColor = new Color3(0.98, 0.45, 0.22);
    boxMat.specularColor = new Color3(0.2, 0.2, 0.2);
    box.material = boxMat;
    box.position = new Vector3(0, 1.6, 0);

    // Gentle idle spin so the canvas visibly renders even before any game
    // renderer is mounted.
    scene.onBeforeRenderObservable.add(() => {
        box.rotation.y += 0.01;
    });

    engine.runRenderLoop(() => scene?.render());
    window.addEventListener('resize', () => engine?.resize());

    void initSpector(canvas);

    dbg('Babylon engine initialized:', engine.getClassName(), 'canvas', canvas.width, 'x', canvas.height);
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

export function renderText(message: string): void {
    dbg('renderText called (no DOM overlay yet), message =', JSON.stringify(message));
}

/**
 * Entry point for the examples pipeline. The SSR payload is a JSON string with
 * an `exampleId`; game renderers are built on Babylon in a later iteration —
 * for now the sim switches in C# and the shared 3D scene keeps rendering.
 */
export async function renderScene(message: string): Promise<void> {
    dbg('renderScene called, message =', JSON.stringify(message));
    if (!engine || !scene) {
        console.error('[babylon-debug] renderScene skipped: Babylon engine not initialized');
        return;
    }
}

dbg('game-bundle loaded, exposing window.initGame / window.renderText / window.renderScene');

window.initGame = initGame;
window.renderText = renderText;
window.renderScene = renderScene;
// ADR-007 Phase 2/3: the co-located Game.Wasm host registers its in-process
// command/signal bridge through this global (see wwwroot/index.html of that host).
window.registerLocalBufferProvider = registerLocalBufferProvider;

// Module evaluation finished — all globals above exist. The Game.Wasm host
// listens for this event instead of polling for registerLocalBufferProvider.
window.dispatchEvent(new Event('babylon-bundle-ready'));