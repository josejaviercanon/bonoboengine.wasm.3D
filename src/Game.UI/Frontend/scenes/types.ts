import { Scene } from '@babylonjs/core/scene';

/**
 * A loaded scene plus its teardown hook. The manager calls `cleanup()` before
 * `scene.dispose()` so shared resources (signal streams, buffer listeners) are
 * released on switch/reload.
 */
export interface SceneHandle {
    scene: Scene;
    cleanup: () => void;
}