import { expect, test } from '@playwright/test';

test.describe('Game.Wasm browser-wasm host', () => {
  test('Babylon.js bootstraps and mounts a canvas', async ({ page }) => {
    await page.goto('/');

    // WASM boot + Babylon init produces the render canvas
    const canvas = page.locator('#render-viewport #render-canvas');
    await expect(canvas).toBeVisible({ timeout: 60_000 });

    // A WebGL2 context must be live on the Babylon canvas.
    const contextType = await canvas.evaluate((el) => {
      const c = el as HTMLCanvasElement;
      const gl = c.getContext('webgl2');
      if (gl) return 'webgl2';
      const gl1 = c.getContext('webgl');
      if (gl1) return 'webgl';
      return 'none';
    });
    expect(['webgl2', 'webgl']).toContain(contextType);
  });

  test('demo scene renders (canvas has drawn pixels)', async ({ page }) => {
    await page.goto('/');

    const canvas = page.locator('#render-viewport #render-canvas');
    await expect(canvas).toBeVisible({ timeout: 60_000 });

    // Demo-balls scene: the Babylon canvas must actually draw — read a few
    // pixels from the live WebGL context and require non-black content.
    const hasPixels = await canvas.evaluate((el) => {
      const c = el as HTMLCanvasElement;
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (!gl) return false;
      const w = c.width || 1;
      const h = c.height || 1;
      const pixels = new Uint8Array(4 * 4);
      gl.readPixels(Math.floor(w / 2), Math.floor(h / 2), 2, 2, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      return pixels.some((v) => v > 0);
    });
    expect(hasPixels).toBe(true);
  });

  test('clicking a sphere applies a camera-aimed impulse', async ({ page }) => {
    await page.goto('/');

    const canvas = page.locator('#render-viewport #render-canvas');
    await expect(canvas).toBeVisible({ timeout: 60_000 });

    // Project Sphere1's center to screen coords using the live scene (debug
    // hook window.__scene) so the click lands on the mesh.
    const screenPos = await page.evaluate(() => {
      const scene = (window as any).__scene;
      const sphere = scene.getMeshByName('Sphere1');
      const V3 = scene.activeCamera.position.constructor;
      const viewport = { x: 0, y: 0, width: 1, height: 1 };
      const p = V3.Project(
        sphere.getAbsolutePosition(),
        scene.getTransformMatrix().constructor.Identity(),
        scene.getTransformMatrix(),
        viewport
      );
      const w = scene.getEngine().getRenderWidth();
      const h = scene.getEngine().getRenderHeight();
      return { x: Math.round(p.x * w), y: Math.round(p.y * h) };
    });
    expect(screenPos.x).toBeGreaterThan(0);
    expect(screenPos.y).toBeGreaterThan(0);

    const readMag = () =>
      page.evaluate(() => {
        const scene = (window as any).__scene;
        const v = scene.getMeshByName('Sphere1').physicsImpostor.getLinearVelocity();
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      });

    const before = await readMag();
    await page.mouse.click(screenPos.x, screenPos.y);
    await page.waitForTimeout(300);
    const after = await readMag();

    // mass=1 sphere: impulse force 60 (default slider value) must visibly bump velocity
    expect(after).toBeGreaterThan(before + 5);
  });

  test('no console errors during bootstrap', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(String(err)));

    await page.goto('/');
    await expect(page.locator('#render-viewport')).toBeAttached({ timeout: 60_000 });

    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('dist frontend assets are served', async ({ request }) => {
    const response = await request.get('/dist/game-bundle.js');
    expect(response.status()).toBe(200);
  });
});