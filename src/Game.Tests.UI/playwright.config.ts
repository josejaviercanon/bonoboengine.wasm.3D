import { defineConfig, devices } from '@playwright/test';

const PORT = 5902;
const BASE_URL = `http://localhost:${PORT}`;
// Local fallback: machines without a system Chrome build point at a Playwright
// chromium via GAME_WEB_CHROME (default 'chrome' channel = installed Google Chrome).
const chromeOverride = process.env.GAME_WEB_CHROME
  ? { executablePath: process.env.GAME_WEB_CHROME }
  : { channel: 'chrome' };

/**
 * E2E suite for the Game.Wasm host (static shell + client-side WASM + Babylon.js bootstrap).
 * Uses the installed Chrome (channel: 'chrome') — do NOT download bundled browsers.
 * The webServer boots the real host via `dotnet run`; set GAME_WEB_EXTERNAL_URL to
 * reuse an already-running instance instead.
 * Per-game renderer specs live in `archived-pixi-game-specs/` (out of testDir) until
 * the Babylon.js game renderers land.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.GAME_WEB_EXTERNAL_URL ?? BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
    ...chromeOverride,
  },
  webServer: process.env.GAME_WEB_EXTERNAL_URL
    ? undefined
    : {
        command: `dotnet run --project ../../src/Game.Wasm`,
        url: `${BASE_URL}/`,
        reuseExistingServer: true,
        timeout: 120_000,
        env: {
          ASPNETCORE_URLS: `http://localhost:${PORT}`,
        },
      },
});
