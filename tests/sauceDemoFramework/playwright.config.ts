import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 80_000,
  expect: {
    timeout: 5000,
  },
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    navigationTimeout: 80000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
