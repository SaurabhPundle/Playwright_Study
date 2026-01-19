import{test,expect} from '@playwright/test';

test('Validate google' , async({page}) => {

  await page.goto('https://google.com');
  await expect(page).toHaveTitle('Google');
  await page.locator('textarea[name="q"]').fill('playwright');
 await Promise.all([
  page.waitForNavigation(),
  page.keyboard.press('Enter'),
]);

// Detect Google bot-check page
const blocked = await page.getByText(/unusual traffic/i).isVisible().catch(() => false);
if (blocked) {
  test.skip(true, 'Google blocked automation (bot-check page)');
}

// Safe assertion pattern
const results = page.locator('h3');
await expect(results.first()).toBeVisible({ timeout: 10_000 });
const texts = await results.allTextContents();
expect(texts.length).toBeGreaterThan(0);


})