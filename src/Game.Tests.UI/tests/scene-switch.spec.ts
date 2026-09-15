import { expect, test } from '@playwright/test';

test.describe('scene switcher', () => {
  test('switches between singlePlayer and ECS scenes, meshes move, no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    const canvas = page.locator('#render-viewport #render-canvas');
    await expect(canvas).toBeVisible({ timeout: 60_000 });

    // Default scene = singlePlayer (physics arena).
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const s = (window as unknown as { __scene: { meshes: Array<{ name: string }> } }).__scene;
            return s ? s.meshes.some((m) => m.name === 'Sphere1') : false;
          }),
        { timeout: 30_000 }
      )
      .toBe(true);

    const box = await canvas.boundingBox();
    expect(box).not.toBeNull();
    // Babylon GUI top bar: "Single Player" ~cx-66, "ECS Scene" ~cx+34, y=21
    // (button centers verified against a rendered screenshot).
    const clickButton = (dx: number) => page.mouse.click(box!.x + box!.width / 2 + dx, box!.y + 21);

    // Switch to ECS: SimHost starts the transform3d sim, the shared buffer
    // feeds the mesh pool through decodeTransform3D.
    await clickButton(34);
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const s = (window as unknown as { __scene: { meshes: Array<{ name: string; isVisible: boolean }> } }).__scene;
            return s ? s.meshes.filter((m) => m.name.startsWith('ecs-entity') && m.isVisible).length : 0;
          }),
        { timeout: 15_000 }
      )
      .toBeGreaterThan(0);

    // ECS mesh transforms must be live: sample a sphere's transform twice.
    const sample = () =>
      page.evaluate(() => {
        const s = (window as unknown as {
          __scene: { meshes: Array<{ name: string; position: { x: number; y: number; z: number }; scaling: { x: number } }> };
        }).__scene;
        const m = s.meshes.find((mesh) => mesh.name === 'ecs-entity-0');
        return m ? { x: m.position.x, y: m.position.y, z: m.position.z, s: m.scaling.x } : null;
      });

    const p1 = await sample();
    await page.waitForTimeout(700);
    const p2 = await sample();
    expect(p1).not.toBeNull();
    expect(p2).not.toBeNull();
    expect(`${p1!.x.toFixed(2)},${p1!.y.toFixed(2)},${p1!.z.toFixed(2)},${p1!.s.toFixed(3)}`).not.toBe(
      `${p2!.x.toFixed(2)},${p2!.y.toFixed(2)},${p2!.z.toFixed(2)},${p2!.s.toFixed(3)}`
    );

    // Lifecycle: spawn adds one visible mesh, despawn removes the newest one.
    const visibleEcsMeshCount = () =>
      page.evaluate(() => {
        const s = (window as unknown as { __scene: { meshes: Array<{ name: string; isVisible: boolean }> } }).__scene;
        return s ? s.meshes.filter((m) => m.name.startsWith('ecs-entity') && m.isVisible).length : 0;
      });
    const postSimCommand = (path: string) =>
      page.evaluate((command) => {
        (window as unknown as { __simCommand: (p: string) => void }).__simCommand(command);
      }, path);

    const meshCountBeforeSpawn = await visibleEcsMeshCount();
    await postSimCommand('/api/transform3d/spawn');
    await expect.poll(visibleEcsMeshCount, { timeout: 15_000 }).toBe(meshCountBeforeSpawn + 1);

    await postSimCommand('/api/transform3d/despawn');
    await expect.poll(visibleEcsMeshCount, { timeout: 15_000 }).toBe(meshCountBeforeSpawn);

    // Reload ECS: sim restarts fresh (entity 0 back near spawn) and still animates.
    await clickButton(34);
    await page.waitForTimeout(500);
    const pReload = await sample();
    expect(pReload).not.toBeNull();
    expect(`${pReload!.x.toFixed(2)},${pReload!.y.toFixed(2)}`).not.toBe(`${p1!.x.toFixed(2)},${p1!.y.toFixed(2)}`);

    // Back to singlePlayer: sim unloaded, arena returns.
    await clickButton(-66);
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const s = (window as unknown as { __scene: { meshes: Array<{ name: string }> } }).__scene;
            return s ? s.meshes.some((m) => m.name === 'Sphere1') : false;
          }),
        { timeout: 15_000 }
      )
      .toBe(true);

    expect(errors.filter((e) => !e.includes('favicon'))).toEqual([]);
  });
});