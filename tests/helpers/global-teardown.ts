import { FullConfig } from "@playwright/test";
import { execSync } from "child_process";
import dotenv from 'dotenv';
dotenv.config();

console.log("RUNNER value:", process.env.RUNNER);

async function globalTeardown(config: FullConfig) {
  console.log("Starting global teardown process");

  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log("Generating Allure report...");

    try {
      execSync("allure generate ./allure-results --clean -o ./allure-report", {
        stdio: "inherit",
      });

      // Do not automatically open the Allure report during CI or automated test runs.
      // Open it manually only when needed.
    } catch (error) {
      console.error("Error generating Allure report:", error);
    }
  }

  console.log("Completed global teardown process");
}

export default globalTeardown;