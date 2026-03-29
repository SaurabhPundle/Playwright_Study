import { test, expect } from "@playwright/test";
import HomePage from "../page-objects/nopcom.home.page";
import { log } from "../helpers/logger";

test("nopcom login test", async ({ page }, testInfo) => {
  // env config
  const envConfig = testInfo.project.use as any;
  const homePage = new HomePage(page);
  await homePage.loginToNopcom(
    envConfig.nopComURL,
    process.env.NOPCOM_USER_NAME,
    process.env.NOPCOM_PASSWORD,
  );
});
