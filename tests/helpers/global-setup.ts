import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config();

console.log("RUNNER value:", process.env.RUNNER);

export default async function globalSetup(config: FullConfig) {
  console.log("Info >> Starting global setup");
  // delete alluer results before running tests
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(">> Running global setup for local runner");
    const resultDir = path.resolve(process.cwd(), "allure-results");
    console.log(`>> resultDir: ${resultDir}`);
    if (fs.existsSync(resultDir)) {
      fs.rmSync(resultDir, { recursive: true, force: true });
      console.log("Info >> Deleted existing allure-results directory");
    }
  }
  console.log("Info >> Completed global setup");
}

// set the login cookie global variable
process.env.LOGIN_COOKIES = undefined;