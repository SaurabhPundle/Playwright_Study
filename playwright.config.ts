import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 80000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    headless: false,
    video: 'off',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    navigationTimeout: 90000,
ignoreHTTPSErrors: true,

    launchOptions: {
      args: [
        '--disable-features=ChromeWhatsNewUI',
        '--disable-infobars',
        '--disable-notifications',
      ],
    },
  },

    projects: [
    {
      name: 'Chromium Desktop',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        headless: false, // set true in CI
        viewport:{width:1920,height:1080},
      },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
