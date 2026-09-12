import { Scene } from '@babylonjs/core/scene';
import { Engine } from '@babylonjs/core/Engines/engine';
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
import HavokPhysics from '@babylonjs/havok';
import { HavokPlugin } from '@babylonjs/core/Physics/v2/Plugins/havokPlugin';
import { PhysicsAggregate } from '@babylonjs/core/Physics/v2/physicsAggregate';
import { PhysicsShapeType } from '@babylonjs/core/Physics/v2/IPhysicsEnginePlugin';
import '@babylonjs/core/Physics/physicsEngineComponent';
import { PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import '@babylonjs/core/Culling/ray';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Slider } from '@babylonjs/gui/2D/controls/sliders/slider';
import { StackPanel } from '@babylonjs/gui/2D/controls/stackPanel';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { Control } from '@babylonjs/gui/2D/controls/control';
import type { SceneHandle } from '../types';

const dbg = (...args: unknown[]) => console.log('[babylon-debug]', ...args);

declare global {
    interface Window {
        __physics: {
            getSphereVelocity: (name: string) => { x: number; y: number; z: number };
        };
    }
}

/**
 * The original interactive demo: Havok-physics spheres bouncing on an arena
 * with a shadow-casting directional light, an impulse slider GUI and
 * click-to-impulse picking. Purely client-side — no ECS simulation involved.
 */
export async function createSinglePlayerScene(engine: Engine, canvas: HTMLCanvasElement): Promise<SceneHandle> {
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.5, 0, 0.5, 1);

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

    const havokInstance = await HavokPhysics({ locateFile: () => './dist/HavokPhysics.wasm' });
    scene.enablePhysics(new Vector3(0, -9.8, 0), new HavokPlugin(true, havokInstance));

    const sphereAggregates = new Map<string, PhysicsAggregate>();
    window.__physics = {
        getSphereVelocity: (name: string) => {
            const agg = sphereAggregates.get(name);
            if (!agg) return { x: 0, y: 0, z: 0 };
            const v = agg.body.getLinearVelocity();
            return { x: v.x, y: v.y, z: v.z };
        },
    };

    const pp = { mass: 1, friction: 0.5, restitution: 0.8 };

    const sphere1 = CreateSphere('Sphere1', { diameter: 2, segments: 16 }, scene);
    sphere1.material = materialAmiga;
    sphere1.position = new Vector3(-20, -3.5, 0);
    shadowGenerator.addShadowCaster(sphere1);
    sphereAggregates.set(sphere1.name, new PhysicsAggregate(sphere1, PhysicsShapeType.SPHERE, pp, scene));

    const sphere2 = CreateSphere('Sphere2', { diameter: 2, segments: 16 }, scene);
    sphere2.material = materialAmiga;
    sphere2.position = new Vector3(5, -3.5, 0);
    shadowGenerator.addShadowCaster(sphere2);
    sphereAggregates.set(sphere2.name, new PhysicsAggregate(sphere2, PhysicsShapeType.SPHERE, pp, scene));

    const agg1 = sphereAggregates.get(sphere1.name)!;
    const agg2 = sphereAggregates.get(sphere2.name)!;
    agg1.body.setLinearDamping(0.4);
    agg1.body.setAngularDamping(0.2);
    agg2.body.setLinearDamping(0.4);
    agg2.body.setAngularDamping(0.2);

    const ground = CreateBox('Ground', { size: 1 }, scene);
    ground.scaling = new Vector3(100, 1, 100);
    ground.position.y = -5;
    ground.checkCollisions = true;

    const border0 = CreateBox('border0', { size: 1 }, scene);
    border0.scaling = new Vector3(1, 30, 100);
    border0.position.y = -5;
    border0.position.x = -50;
    border0.checkCollisions = true;

    const border1 = CreateBox('border1', { size: 1 }, scene);
    border1.scaling = new Vector3(1, 30, 100);
    border1.position.y = -5;
    border1.position.x = 50;
    border1.checkCollisions = true;

    const border2 = CreateBox('border2', { size: 1 }, scene);
    border2.scaling = new Vector3(100, 30, 1);
    border2.position.y = -5;
    border2.position.z = 50;
    border2.checkCollisions = true;

    const border3 = CreateBox('border3', { size: 1 }, scene);
    border3.scaling = new Vector3(100, 30, 1);
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

    new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0, friction: 2, restitution: 0.7 }, scene);
    new PhysicsAggregate(border0, PhysicsShapeType.BOX, { mass: 0, restitution: 0.7 }, scene);
    new PhysicsAggregate(border1, PhysicsShapeType.BOX, { mass: 0, restitution: 0.7 }, scene);
    new PhysicsAggregate(border2, PhysicsShapeType.BOX, { mass: 0, restitution: 0.7 }, scene);
    new PhysicsAggregate(border3, PhysicsShapeType.BOX, { mass: 0, restitution: 0.7 }, scene);

    agg1.body.setLinearVelocity(new Vector3(30, 0, -6));

    const spin = true;
    let i = 0;
    const points: Vector3[] = [];
    scene.registerBeforeRender(() => {
        if (!spin) return;
        i++;
        if (i < 300 && i % 5 === 0) {
            const v = agg1.body.getLinearVelocity();
            agg1.body.applyForce(
                new Vector3(0, 0, v.x * 0.8),
                sphere1.getAbsolutePosition().add(new Vector3(0, 0, -10))
            );
            points.push(new Vector3(sphere1.getAbsolutePosition().x, -4.5, sphere1.getAbsolutePosition().z));
            CreateLines('lines', { points }, scene);
        }
    });

    let impulseForce = 60;
    const gui = AdvancedDynamicTexture.CreateFullscreenUI('ui', true, scene);
    gui.idealWidth = 1920;
    const panel = new StackPanel('force-panel');
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    panel.left = '16px';
    panel.top = '64px';
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
        if (!mesh) return;
        const agg = sphereAggregates.get(mesh.name);
        if (!agg) return;
        const from = camera.position;
        const to = mesh.getAbsolutePosition();
        const dir = to.subtract(from);
        dir.normalize();
        agg.body.applyImpulse(dir.scale(impulseForce), to);
    });

    dbg('singlePlayer scene created');
    return { scene, cleanup: () => {} };
}