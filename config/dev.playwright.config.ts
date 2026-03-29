import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config.ts";
import { EnvConfig } from "../tests/helpers/config-fixtures.ts"; // import the type for config fixtures
import path from "path";
console.log("LOADING DEV ENVIRONMENT");
export default defineConfig<EnvConfig>({
  // <> means extends

  ...baseConfig, // load all existing config from baseConfig and override if needed
  testDir: path.resolve(process.cwd(), "./tests"),
  // Override default config here, if needed.
  use: {
    ...baseConfig.use, // load existing use config and override if needed
    envName: "dev",
    appURL: "https://www.google.com/",
    dbConfig: {
      server: "",
      dbname: "",
      connectionStr: "",
    },
  },
});
