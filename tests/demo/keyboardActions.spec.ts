import { test, expect } from "@playwright/test";
// npx playwright test --config=config/test.playwright.config.ts tests/demo/keyboardActions.spec.ts --headed
test("keyboard actions", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  // Handle login popup if it appears
  try {
    await page.locator(".b3wTlE").click({ timeout: 5000 });
  } catch (e) {
    // No popup or already handled
  }
  await page
    .getByPlaceholder("Search for Products, Brands and More")
    .first()
    .focus();
  await page.keyboard.type("fan r");
  //await page.keyboard.press("Enter");
  await page.keyboard.press("Backspace");
  await page.keyboard.press("Control+a");
  await page.keyboard.press("Backspace");
});

test('copy paste', async ({ page }) => {
  await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
  await page.locator("#name").focus();
  await page.keyboard.type("Saurabh Pundle");
  await page.keyboard.press("Control+A");
    await page.keyboard.press("Control+C");
    await page.locator("#email").focus();
    await page.keyboard.press("Control+V");
    await page.waitForTimeout(3000);

    // await page.down("Shiftt+Tab"); // to move back to name field
});
