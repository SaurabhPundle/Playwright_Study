import {test,expect,chromium,Page} from  '@playwright/test';
// npx playwright test --config=config/test.playwright.config.ts tests/demo/multipleWindowsTabs.spec.ts --headed
test("Multiple Tabs" , async({page:Page})=>
{
    const browser = await chromium.launch({headless: false});
    const context =await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://demoqa.com/");
    await page.locator("text = Alerts, Frame & Windows").click();
    await page.locator("text=Browser Windows").click();

    const [newTab] = await Promise.all([
        page.waitForEvent("popup"),
        await page.locator("#tabButton").click()

    ]);
await newTab.waitForLoadState();
console.log("new tab url is " + newTab.url());


});

test("Multiple windows" , async({page:Page})=>
{
    const browser = await chromium.launch({headless: false});
    const context =await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://demoqa.com/");
    await page.locator("text = Alerts, Frame & Windows").click();
    await page.locator("text=Browser Windows").click();

    const [newWindow] = await Promise.all([
        context.waitForEvent("page"),
        await page.locator("#windowButton").click()

    ]);
await newWindow.waitForLoadState();
console.log("new tab url is " + newWindow.url());


});

