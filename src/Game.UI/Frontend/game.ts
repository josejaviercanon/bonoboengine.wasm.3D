import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { CreateLines } from '@babylonjs/core/Meshes/Builders/linesBuilder';
import { PhysicsImpostor } from '@babylonjs/core/Physics/v1/physicsImpostor';
import { CannonJSPlugin } from '@babylonjs/core/Physics/v1/Plugins/cannonJSPlugin';
import '@babylonjs/core/Physics/physicsEngineComponent';
import { PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import '@babylonjs/core/Culling/ray';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Slider } from '@babylonjs/gui/2D/controls/sliders/slider';
import { StackPanel } from '@babylonjs/gui/2D/controls/stackPanel';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { Control } from '@babylonjs/gui/2D/controls/control';
import cannon from 'cannon';
import { registerLocalBufferProvider, type LocalBufferProvider } from './signalSource';

// Debug helper: every interop entry/exit point logs under one prefix so the
// whole pipeline is traceable from the browser console (F12).
const dbg = (...args: unknown[]) => console.log('[babylon-debug]', ...args);

declare global {
    interface Window {
        initGame: (containerId: string) => Promise<void>;
        registerLocalBufferProvider: (provider: LocalBufferProvider) => void;
        __spector: unknown;
        __scene: unknown;
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

    const canvas = document.createElement('canvas');
    canvas.id = 'render-canvas';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    engine = new Engine(canvas, true, { antialias: true, stencil: true, preserveDrawingBuffer: true });
    scene = new Scene(engine);
    // Debug hook: scene access from the browser console (same spirit as ?spector=1).
    window.__scene = scene;
    scene.clearColor = new Color4(0.5, 0, 0.5, 1);

    // Demo-balls scene (ported from playground demo-balls.html): free camera
    // with collisions, amiga-textured spheres bouncing on a CannonJS physics
    // arena with shadow-casting directional light.
    const camera = new FreeCamera('Camera', new Vector3(-25, 20, -70), scene);
    camera.attachControl(canvas, true);
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.setTarget(Vector3.Zero());

    const light = new DirectionalLight('dir02', new Vector3(0.2, -1, 0), scene);
    light.position = new Vector3(0, 80, 0);

    const amigaTexture = new Texture('https://playground.babylonjs.com/textures/amiga.jpg', scene);
    const materialAmiga = new StandardMaterial('amiga', scene);
    materialAmiga.diffuseTexture = amigaTexture;
    materialAmiga.emissiveColor = new Color3(0.5, 0.5, 0.5);
    amigaTexture.uScale = 5;
    amigaTexture.vScale = 5;

    const materialAmiga2 = new StandardMaterial('amiga', scene);
    materialAmiga2.diffuseTexture = new Texture('https://playground.babylonjs.com/textures/amiga.jpg', scene);
    materialAmiga2.emissiveColor = new Color3(0.5, 0.5, 0.5);

    const shadowGenerator = new ShadowGenerator(2048, light);

    scene.enablePhysics(new Vector3(0, -9.8, 0), new CannonJSPlugin(true, 10, cannon));

    const pp = { mass: 1, friction: 0.5, restitution: 0.8 };

    const sphere1 = CreateSphere('Sphere1', { diameter: 2, segments: 16 }, scene);
    sphere1.material = materialAmiga;
    sphere1.position = new Vector3(-20, -3.5, 0);
    shadowGenerator.addShadowCaster(sphere1);
    sphere1.physicsImpostor = new PhysicsImpostor(sphere1, PhysicsImpostor.SphereImpostor, pp, scene);

    const sphere2 = CreateSphere('Sphere2', { diameter: 2, segments: 16 }, scene);
    sphere2.material = materialAmiga;
    sphere2.position = new Vector3(5, -3.5, 0);
    shadowGenerator.addShadowCaster(sphere2);
    sphere2.physicsImpostor = new PhysicsImpostor(sphere2, PhysicsImpostor.SphereImpostor, pp, scene);

    const damping = 0.2;
    const imp1 = sphere1.physicsImpostor!;
    const imp2 = sphere2.physicsImpostor!;
    if (imp1.physicsBody.setDamping) {
        imp1.physicsBody.setDamping(damping, damping);
        imp2.physicsBody.setDamping(damping, damping);
    }
    if (imp1.physicsBody.linearDamping) {
        imp1.physicsBody.linearDamping = 0.4;
        imp2.physicsBody.linearDamping = 0.4;
    }

    const ground = CreateBox('Ground', { size: 1 }, scene);
    ground.scaling = new Vector3(100, 1, 100);
    ground.position.y = -5;
    ground.checkCollisions = true;

    const border0 = CreateBox('border0', { size: 1 }, scene);
    border0.scaling = new Vector3(1, 10, 100);
    border0.position.y = -5;
    border0.position.x = -50;
    border0.checkCollisions = true;

    const border1 = CreateBox('border1', { size: 1 }, scene);
    border1.scaling = new Vector3(1, 10, 100);
    border1.position.y = -5;
    border1.position.x = 50;
    border1.checkCollisions = true;

    const border2 = CreateBox('border2', { size: 1 }, scene);
    border2.scaling = new Vector3(100, 10, 1);
    border2.position.y = -5;
    border2.position.z = 50;
    border2.checkCollisions = true;

    const border3 = CreateBox('border3', { size: 1 }, scene);
    border3.scaling = new Vector3(100, 10, 1);
    border3.position.y = -5;
    border3.position.z = -50;
    border3.checkCollisions = true;

    const groundMat = new StandardMaterial('groundMat', scene);
    groundMat.diffuseColor = new Color3(0.5, 0.5, 0.5);
    groundMat.emissiveColor = new Color3(0.2, 0.2, 0.2);
    groundMat.backFaceCulling = false;
    ground.material = groundMat;
    border0.material = groundMat;
    border1.material = groundMat;
    border2.material = groundMat;
    border3.material = groundMat;
    ground.receiveShadows = true;

    CreateLines('lines', { points: [new Vector3(-50, -4.5, 0), new Vector3(50, -4.5, 0)] }, scene);

    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: 2, restitution: 0.7 }, scene);
    border0.physicsImpostor = new PhysicsImpostor(border0, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.7 }, scene);
    border1.physicsImpostor = new PhysicsImpostor(border1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.7 }, scene);
    border2.physicsImpostor = new PhysicsImpostor(border2, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.7 }, scene);
    border3.physicsImpostor = new PhysicsImpostor(border3, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.7 }, scene);

    sphere1.physicsImpostor!.setLinearVelocity(new Vector3(30, 0, -6));

    const spin = true;
    let i = 0;
    const points: Vector3[] = [];
    scene.registerBeforeRender(() => {
        if (!spin) return;
        i++;
        if (i < 300 && i % 5 === 0) {
            const v = sphere1.physicsImpostor!.getLinearVelocity()!;
            sphere1.physicsImpostor!.applyForce(
                new Vector3(0, 0, v.x * 0.8),
                sphere1.getAbsolutePosition().add(new Vector3(0, 0, -10))
            );
            points.push(new Vector3(sphere1.getAbsolutePosition().x, -4.5, sphere1.getAbsolutePosition().z));
            CreateLines('lines', { points }, scene);
        }
    });

    // Force slider (Babylon 2D GUI overlay, top-left corner). Clicking a sphere
    // applies an impulse along camera->sphere direction scaled by this value.
    let impulseForce = 60;
    const gui = AdvancedDynamicTexture.CreateFullscreenUI('ui');
    gui.idealWidth = 1920;
    const panel = new StackPanel('force-panel');
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    panel.left = '16px';
    panel.top = '16px';
    const label = new TextBlock('force-label', `Impulse force: ${impulseForce}`);
    label.color = '#e2e8f0';
    label.fontSize = 16;
    label.height = '24px';
    label.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.addControl(label);
    const slider = new Slider('force-slider');
    slider.minimum = 0;
    slider.maximum = 500;
    slider.value = impulseForce;
    slider.width = '220px';
    slider.height = '20px';
    slider.color = '#f97316';
    slider.background = '#334155';
    slider.isThumbCircle = true;
    slider.onValueChangedObservable.add((value) => {
        impulseForce = value;
        label.text = `Impulse force: ${Math.round(value)}`;
    });
    panel.addControl(slider);
    gui.addControl(panel);

    scene.onPointerObservable.add((evt) => {
        if (evt.type !== PointerEventTypes.POINTERPICK) return;
        const mesh = evt.pickInfo?.pickedMesh;
        if (!mesh || !mesh.name.startsWith('Sphere') || !mesh.physicsImpostor) return;
        const from = camera.position;
        const to = mesh.getAbsolutePosition();
        const dir = to.subtract(from);
        dir.normalize();
        mesh.physicsImpostor.applyImpulse(dir.scale(impulseForce), to);
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

dbg('game-bundle loaded, exposing window.initGame');

window.initGame = initGame;
// ADR-007 Phase 2/3: the co-located Game.Wasm host registers its in-process
// command/signal bridge through this global (see wwwroot/index.html of that host).
window.registerLocalBufferProvider = registerLocalBufferProvider;

// Module evaluation finished — all globals above exist. The Game.Wasm host
// listens for this event instead of polling for registerLocalBufferProvider.
window.dispatchEvent(new Event('babylon-bundle-ready'));