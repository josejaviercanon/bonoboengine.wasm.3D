import { expect, test } from '@playwright/test';

test.describe('Game.Wasm browser-wasm host', () => {
  test('welcome modal appears on boot and dismisses on Continue', async ({ page }) => {
    await page.goto('/');

    const modal = page.locator('#welcome-modal');
    await expect(modal).toBeVisible({ timeout: 60_000 });
    await expect(modal.locator('h1')).toContainText('Bonobo Engine');

    const continueBtn = page.locator('#welcome-continue');
    await continueBtn.click();
    await expect(modal).toBeHidden({ timeout: 10_000 });
  });

  test('home page renders toolbar after Welcome dismiss', async ({ page }) => {
    await page.goto('/');

    // Dismiss welcome modal first
    const continueBtn = page.locator('#welcome-continue');
    await expect(continueBtn).toBeVisible({ timeout: 60_000 });
    await continueBtn.click();

    // Wait for the toolbar selects to be populated by main.mjs after WASM boot
    const gameSelect = page.locator('#game-select');
    await expect(gameSelect).toBeVisible({ timeout: 60_000 });
    // 6 games + 1 placeholder option
    await expect(gameSelect.locator('option')).toHaveCount(7, { timeout: 60_000 });
  });

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