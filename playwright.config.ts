import { defineConfig, devices } from "@playwright/test";

/* Read environment variables from .env file. See

*/

import dotenv from "dotenv";
dotenv.config();
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

console.log("Hello from config file 👏");

export const baseConfig = defineConfig({
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
    screenshot: "on",
    navigationTimeout: 80_000,
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: "Chromium Desktop",
      use: {
        browserName: "chromium",
        ...devices["Desktop Chrome"],
        headless: false,
        // viewport: null,

        ignoreHTTPSErrors: true,

        // launchOptions: {
        //   args: [
        //     "--disable-features=ChromeWhatsNewUI",
        //     "--disable-infobars",
        //     "--disable-notifications",
        //     "--start-maximized",
        //   ],
        // },
      },
    },

    // Optional browsers
    // {
    //   name: "Firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //     ignoreHTTPSErrors: true,
    //   },
    // },
//     {
//       name: "Webkit",
//       use: { ...devices["Desktop Safari"],ignoreHTTPSErrors: true, },
      
//     },
// {
//   name: "Galaxy A55",
//   use:{...devices["Galaxy A55"]}
// }
  ],
});