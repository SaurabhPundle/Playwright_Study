import { expect } from "@playwright/test";
import { test } from "../helpers/config-fixtures";
import HomePage from "../page-objects/nopcom.home.page";
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

test("nopcom login test", async ({ page, nopComURL }) => {
  console.log('Using nopComURL:', nopComURL);
  const authFile = path.resolve(process.cwd(), "auth-nopcom.json");
  const profileDir = path.resolve(process.cwd(), "auth-nopcom-profile");

  if (fs.existsSync(profileDir)) {
    console.log('Using persistent user-data profile at', profileDir);
    const context = await chromium.launchPersistentContext(profileDir, {
      headless: false,
      viewport: null,
      args: [
        '--start-maximized',
        '--disable-blink-features=AutomationControlled',
      ],
    });
    const authPage = await context.newPage();
    await authPage.goto(`${nopComURL}/admin/`, { waitUntil: 'domcontentloaded' });
    await expect(authPage).toHaveURL(`${nopComURL}/admin/`);
    const title = await authPage.title();
    if (title.includes('Just a moment') || title.includes('Checking your browser')) {
      await context.close();
      throw new Error('Saved profile appears blocked by Cloudflare. Re-run npm run auth:nopcom and complete the verification + login in the opened browser.');
    }
    await context.close();
  } else if (fs.existsSync(authFile)) {
    console.log('Using saved storage state at', authFile);
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({ storageState: authFile });
    const authPage = await context.newPage();
    await authPage.goto(`${nopComURL}/admin/`, { waitUntil: 'domcontentloaded' });
    await expect(authPage).toHaveURL(`${nopComURL}/admin/`);
    const title = await authPage.title();
    if (title.includes('Just a moment') || title.includes('Checking your browser')) {
      await browser.close();
      throw new Error('Saved auth state appears blocked by Cloudflare. Re-run npm run auth:nopcom and complete the verification + login in the opened browser.');
    }
    await browser.close();
  } else {
    console.warn('No auth state found; falling back to direct login.');
    const homePage = new HomePage(page);
    await homePage.loginToNopcom(
      nopComURL,
      process.env.NOPCOM_USER_NAME,
      process.env.NOPCOM_PASSWORD,
    );
  }
});
