import { test, expect } from '@playwright/test';
import path from 'path';

test('screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('https://www.amazon.in/', { waitUntil: 'domcontentloaded' });

  // wait for key element
  await page.locator('#nav-logo-sprites').waitFor({ state: 'visible' });

  // handle popup (if any)
  const acceptBtn = page.locator('input[name="accept"]');
  if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
  }

  await page.waitForTimeout(2000);

  const screenshotPath = path.join(process.cwd(), 'screenshots', `amazon-${Date.now()}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`Screenshot saved to: ${screenshotPath}`);


  // take single element screenshot
   const ele  = page.locator("#twotabsearchtextbox")
   await ele?.screenshot({path: path.join(process.cwd(), 'screenshots', `searchbox-${Date.now()}.png`)});
});