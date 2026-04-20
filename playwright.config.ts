import { defineConfig, devices } from "@playwright/test";

/* Read environment variables from .env file. See

*/

import dotenv from "dotenv";
dotenv.config();
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

console.log("Hello from config file 👏");

export const baseConfig = defineConfig({
  // Playwright expects a default export, not a named export.

  // export default defineConfig({
  testDir: "./tests",

  globalTimeout: 3 * 60 * 60 * 1000, // 3 hrs
  timeout: 80_000,

  fullyParallel: false,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  expect: {
    timeout: 5_000,
  },
  globalSetup: require.resolve("./tests/helpers/global-setup"),
  globalTeardown: require.resolve("./tests/helpers/global-teardown"),

  reporter: [
    ["html", { open: "never" }],
    [
      "allure-playwright",
      {
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          name: "TEST",
          appName: "CURA",
          Release: "Release 1.1",
          node_version: process.version,
        },
      },
    ],
  ],

  use: {
    headless: false,
    video: "off",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    navigationTimeout: 80_000,
    actionTimeout: 10_000,
    ignoreHTTPSErrors: true,
    viewport: null,

    launchOptions: {
      args: [
        //     "--disable-features=ChromeWhatsNewUI",
        //     "--disable-infobars",
        //     "--disable-notifications",
        "--start-maximized",
      ],
    },
  },

  projects: [
    {
      name: "Chromium Desktop",
      use: {
        browserName: "chromium",
        // ...devices["Desktop Chrome"], // to use default desktop chrome config from playwright, but we want to override some of the default config, so we will use custom launch options above
      },
    },

    // Optional browsers
    // {
    //   name: "Firefox",
    //   use: {
    //     ...devices["Desktop Firefox"], // Viewport : null not applied for firefox even we use custom launch options, so we need to override the viewport config for firefox     
    //   },
    // },
    // {
    //   name: "Webkit",
    //   use: { ...devices["Desktop Safari"] }, // Viewport : null not applied for webkit even we use custom launch options, so we need to override the viewport config for webkit4
    // },
    // {
    //   name: "Galaxy A55",
    //   use:{...devices["Galaxy A55"]}
    // }
  ],
});
