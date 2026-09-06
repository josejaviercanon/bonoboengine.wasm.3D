declare module 'spectorjs' {
  class Spector {
    constructor(options?: { rootPlaceHolder?: HTMLElement; hideLog?: boolean });
    displayUI(): void;
    hide(): void;
    startCapture(canvas: HTMLCanvasElement, maxFrames?: number): void;
    stopCapture(): void;
    onCaptureFinished: import("@babylonjs/core/Misc/observable").Observable<any>;
    onCaptureRequested: import("@babylonjs/core/Misc/observable").Observable<any>;
  }
  export { Spector };
}