import {
    BUFFER_HEADER_LENGTH,
    type ScalarArray,
    type Transform3DState,
    Transform3DStateStride,
} from '../generated/signalLayout';

/** Decoded header + entity records from one `transform3d` signal buffer. */
export interface Transform3DSnapshot {
    seq: number;
    entityCount: number;
    stride: number;
    stepMs: number;
    tickMs: number;
    states: Transform3DState[];
}

/**
 * Decodes a `transform3d` snapshot from the shared-memory view over the pinned
 * buffer. The scalar contract is pure 64-bit: the host always hands over a
 * `Float64Array` (pinned at compile time by the generated `ScalarArray` type).
 *
 * Layout (per Transform3DState): id + position (x, y, z) + rotation quaternion
 * (qx, qy, qz, qw) + scale (sx, sy, sz) + lifecycle flag, stride 12 after the
 * 6-element header.
 */
export function decodeTransform3D(values: ScalarArray): Transform3DSnapshot {
    const seq = values[0];
    const entityCount = values[2];
    const stride = values[3];
    const stepMs = values[4];
    const tickMs = values[5];

    const states: Transform3DState[] = [];
    for (let i = 0; i < entityCount; i++) {
        const base = BUFFER_HEADER_LENGTH + i * Transform3DStateStride;
        states.push({
            id: values[base],
            x: values[base + 1],
            y: values[base + 2],
            z: values[base + 3],
            qx: values[base + 4],
            qy: values[base + 5],
            qz: values[base + 6],
            qw: values[base + 7],
            sx: values[base + 8],
            sy: values[base + 9],
            sz: values[base + 10],
            lifecycle: values[base + 11],
        });
    }

    return { seq, entityCount, stride, stepMs, tickMs, states };
}
