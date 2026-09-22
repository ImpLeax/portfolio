import { defineConfig } from '@playwright/test';

const basePath = `${(process.env.BASE_PATH || '/').replace(/\/$/, '')}/`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  timeout: 30_000,
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:4321${basePath}`,
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --ignore-lock',
    url: `http://127.0.0.1:4321${basePath}`,
    reuseExistingServer: !process.env.CI,
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
  },
});
