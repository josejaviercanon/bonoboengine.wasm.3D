import { Scene } from '@babylonjs/core/scene';
import { Engine } from '@babylonjs/core/Engines/engine';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Vector3, Quaternion } from '@babylonjs/core/Maths/math.vector';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Button } from '@babylonjs/gui/2D/controls/button';
import { StackPanel } from '@babylonjs/gui/2D/controls/stackPanel';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { connectSignalStream, getLocalBufferProvider } from '../../signalSource';
import { decodeTransform3D } from '../transform3d/EntityDecoder';
import type { SceneHandle } from '../types';

const dbg = (...args: unknown[]) => console.log('[babylon-debug]', ...args);

/** Meshes created eagerly at scene boot; the pool grows on demand for spawned entities. */
const MESH_POOL_CAPACITY = 32;

/** Lifecycle flags mirroring `Game.Engine.ECS.EntityLifecycle3` (stride 12, element 11). */
const LIFECYCLE_SPAWNED = 1;
const LIFECYCLE_DESTROYED = 3;

/**
 * ECS-authoritative 3D demo scene. All transforms (position + quaternion +
 * scale + lifecycle) arrive batched as a Float64Array view over the pinned
 * shared buffer ("transform3d" signal), decoded by `decodeTransform3D` and
 * applied to the mesh pool every tick. Zero per-entity interop calls, zero JSON.
 *
 * Lifecycle: `1` spawns (creates the mesh if needed), `3` disposes it. Meshes
 * whose id is absent from a snapshot are hidden, so sim reloads cannot leave
 * stale geometry on screen.
 */
export async function createEcsScene(engine: Engine, canvas: HTMLCanvasElement): Promise<SceneHandle> {
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.06, 0.08, 0.12, 1);

    const camera = new ArcRotateCamera('Camera', -Math.PI / 2, Math.PI / 3, 70, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.setTarget(Vector3.Zero());

    const light = new HemisphericLight('light', new Vector3(0.4, 1, 0.2), scene);
    light.intensity = 0.9;

    const material = new StandardMaterial('ecs-sphere-mat', scene);
    material.diffuseColor = new Color3(0.95, 0.5, 0.2);
    material.emissiveColor = new Color3(0.25, 0.12, 0.05);
    material.specularColor = new Color3(0.9, 0.9, 0.9);

    const ground = CreateGround('ecs-ground', { width: 100, height: 100 }, scene);
    const groundMat = new StandardMaterial('ecs-ground-mat', scene);
    groundMat.diffuseColor = new Color3(0.16, 0.18, 0.24);
    groundMat.emissiveColor = new Color3(0.05, 0.06, 0.09);
    ground.material = groundMat;
    ground.position.y = -4;

    const pool = new Map<number, Mesh>();

    const createMesh = (id: number): Mesh => {
        const mesh = CreateSphere(`ecs-entity-${id}`, { diameter: 2, segments: 12 }, scene);
        mesh.material = material;
        mesh.rotationQuaternion = new Quaternion();
        mesh.isVisible = false;
        pool.set(id, mesh);
        return mesh;
    };

    for (let i = 0; i < MESH_POOL_CAPACITY; i++) {
        createMesh(i);
    }

    const ensureMesh = (id: number): Mesh => pool.get(id) ?? createMesh(id);

    const stream = connectSignalStream('/api/transform3d/stream');
    if (!stream) {
        console.error('[babylon-debug] sceneECS: no signal stream (local-buffer provider missing)');
    } else {
        stream.addBufferListener('transform3d', (values) => {
            const snapshot = decodeTransform3D(values);
            const alive = new Set<number>();

            for (const state of snapshot.states) {
                if (state.lifecycle === LIFECYCLE_DESTROYED) {
                    const doomed = pool.get(state.id);
                    if (doomed) {
                        doomed.dispose();
                        pool.delete(state.id);
                    }
                    continue;
                }

                if (state.lifecycle === LIFECYCLE_SPAWNED) {
                    dbg('ecs entity spawned', state.id);
                }

                alive.add(state.id);
                const mesh = ensureMesh(state.id);
                mesh.isVisible = true;
                mesh.position.set(state.x, state.y, state.z);
                mesh.rotationQuaternion!.set(state.qx, state.qy, state.qz, state.qw);
                mesh.scaling.set(state.sx, state.sy, state.sz);
            }

            for (const [id, mesh] of pool) {
                if (!alive.has(id)) mesh.isVisible = false;
            }
        });
    }

    buildLifecycleGui(scene);

    dbg('ecs scene created, mesh pool', pool.size);
    return { scene, cleanup: () => stream?.close() };
}

/** Bottom-left Spawn/Despawn buttons: low-frequency primitive commands to the sim. */
function buildLifecycleGui(scene: Scene): void {
    const gui = AdvancedDynamicTexture.CreateFullscreenUI('ecs-lifecycle', true, scene);
    gui.idealWidth = 1920;

    const panel = new StackPanel('ecs-lifecycle-buttons');
    panel.isVertical = false;
    panel.width = '240px';
    panel.height = '40px';
    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    panel.left = '16px';
    panel.top = '-16px';

    const post = (verb: string) => {
        const provider = getLocalBufferProvider();
        if (provider?.postCommand) {
            provider.postCommand(`/api/transform3d/${verb}`);
        }
    };

    for (const [label, verb] of [['Spawn', 'spawn'], ['Despawn', 'despawn']] as const) {
        const button = Button.CreateSimpleButton(`btn-${verb}`, label);
        button.width = '110px';
        button.height = '40px';
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        button.color = '#e2e8f0';
        button.background = '#334155';
        button.cornerRadius = 8;
        button.fontSize = 16;
        button.paddingLeft = '12px';
        button.paddingRight = '12px';
        button.onPointerClickObservable.add(() => post(verb));
        panel.addControl(button);
    }

    gui.addControl(panel);
}
