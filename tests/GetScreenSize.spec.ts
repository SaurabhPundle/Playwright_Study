import{test,expect} from '@playwright/test'
test('print screen size', async ({ page }) => {
  const size = await page.evaluate(() => ({
    width: screen.width,
    height: screen.height
  }));

  console.log(size);
});
