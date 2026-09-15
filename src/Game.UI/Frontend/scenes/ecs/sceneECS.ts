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
import { connectSignalStream } from '../../signalSource';
import { decodeTransform3D } from '../transform3d/EntityDecoder';
import type { SceneHandle } from '../types';

const dbg = (...args: unknown[]) => console.log('[babylon-debug]', ...args);

/** Mesh pool cap — the C# sim spawns 12 entities; headroom for future growth. */
const MESH_POOL_CAPACITY = 32;

/**
 * ECS-authoritative 3D demo scene. All transforms (position + quaternion +
 * scale) arrive batched as a Float64Array view over the pinned shared buffer
 * ("transform3d" signal), decoded by `decodeTransform3D` and applied to the
 * mesh pool every tick. Zero per-entity interop calls, zero JSON.
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
    for (let i = 0; i < MESH_POOL_CAPACITY; i++) {
        const mesh = CreateSphere(`ecs-entity-${i}`, { diameter: 2, segments: 12 }, scene);
        mesh.material = material;
        mesh.rotationQuaternion = new Quaternion();
        mesh.isVisible = false;
        pool.set(i, mesh);
    }

    const stream = connectSignalStream('/api/transform3d/stream');
    if (!stream) {
        console.error('[babylon-debug] sceneECS: no signal stream (local-buffer provider missing)');
    } else {
        stream.addBufferListener('transform3d', (values) => {
            const snapshot = decodeTransform3D(values);
            for (const state of snapshot.states) {
                const mesh = pool.get(state.id);
                if (!mesh) continue;
                mesh.isVisible = true;
                mesh.position.set(state.x, state.y, state.z);
                mesh.rotationQuaternion!.set(state.qx, state.qy, state.qz, state.qw);
                mesh.scaling.set(state.sx, state.sy, state.sz);
            }
        });
    }

    dbg('ecs scene created, mesh pool', pool.size);
    return { scene, cleanup: () => stream?.close() };
}