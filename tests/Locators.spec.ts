import {test,expect} from '@playwright/test';

test('Locators_Study', async({page})=>{

await page.goto('https://amazon.in/');

// await page.getByRole('searchbox',{name:'Search Amazon.in'}).fill('WASHING MACHINE')

// await page.getByLabel('Search Amazon.in').fill('laptop');

// await page.locator('#twotabsearchtextbox').fill('MObilePhone');
await page.locator('input[aria-label="Search Amazon.in"]').fill('IpHOne');

await page.locator('input[aria-label="Search Amazon.in"]').press('Enter');

await page.getByText('iPhone 17 Pro Max').first().click();
const price = page.locator('span.a-price-whole:visible').textContent;

// const price = page.locator('span.a-price-whole').textContent();
console.log(await price);


await page.waitForTimeout(10000);
})

test('print screen size', async ({ page }) => {
  const size = await page.evaluate(() => ({
    width: screen.width,
    height: screen.height
  }));

  console.log(size);
  await page.waitForTimeout(10000);
});
