import {
    BUFFER_HEADER_LENGTH,
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
 * Decodes a `transform3d` snapshot from the shared-memory Float32Array view.
 * Layout (per Transform3DState): id + position (x, y, z) + rotation quaternion
 * (qx, qy, qz, qw) + scale (sx, sy, sz), stride 11 after the 6-float header.
 */
export function decodeTransform3D(floats: Float32Array): Transform3DSnapshot {
    const seq = floats[0];
    const entityCount = floats[2];
    const stride = floats[3];
    const stepMs = floats[4];
    const tickMs = floats[5];

    const states: Transform3DState[] = [];
    for (let i = 0; i < entityCount; i++) {
        const base = BUFFER_HEADER_LENGTH + i * Transform3DStateStride;
        states.push({
            id: floats[base],
            x: floats[base + 1],
            y: floats[base + 2],
            z: floats[base + 3],
            qx: floats[base + 4],
            qy: floats[base + 5],
            qz: floats[base + 6],
            qw: floats[base + 7],
            sx: floats[base + 8],
            sy: floats[base + 9],
            sz: floats[base + 10],
        });
    }

    return { seq, entityCount, stride, stepMs, tickMs, states };
}