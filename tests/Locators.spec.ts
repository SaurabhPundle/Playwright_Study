// Practice 1
/*import {test,expect} from '@playwright/test';

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
*/

// Practice 2  --> All locators in one test
import { test , expect} from '@playwright/test';
import './helpers/test-hooks'; // import the test hooks to capture screenshot on failure using afterhook;
test.skip('Loactors Practice',async({page})=>{
   await page.goto("https://www.amazon.in/")
  //  await page.getByRole('searchbox',{name:'Search Amazon.in'}).fill("laptop");
  // await page.locator(".nav-input.nav-progressive-attribute").first().fill("mobile"); // css selector
  //  await page.getByRole('button',{name:'Go',exact:true}).click();  
  // await page.getByText("Customer Service").click();
  // await page.locator("//input[@id='twotabsearchtextbox']").fill("Clock"); // xpath
  await page.locator("//a[text()='Mobiles']").click(); // locator by text in xpath
  await page.waitForTimeout(7000);
});
  test.only('Loactors tutorialspoint',async({page})=>{
  await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php")
  const lable = page.getByLabel("Name:");
  await expect(lable).toBeVisible();
  await lable.fill("ASDFG");
  await page.getByPlaceholder("name@example.com").fill("xyz@gmail.com");
  await page.getByTitle("back to Selenium Tutorial").click();

  
//   await page.goto("https://en.wikipedia.org/wiki/Playwright_(software)");
//   await page.getByAltText('Playwright logo').click();
await page.waitForTimeout(10000);

})
test.afterEach(async ({}, testInfo) => {  // use to atteched screenshot in allure report
  console.log("Attachments:", testInfo.attachments);
});

test.skip('Locator css or xpath at saucedemo',async({page})=>{
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user"); // id
  await page.locator("input[type='password']").fill("secret_sauce"); // customize css selector
  await page.locator(".submit-button.btn_action").click(); // class

  await page.waitForTimeout(10000);

})

