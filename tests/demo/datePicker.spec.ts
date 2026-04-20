import{test,expect} from '@playwright/test';
// npx playwright test --config=config/test.playwright.config.ts tests/demo/datePicker.spec.ts --headed
test('date picker by fill',async({page})=> {
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
    await page.locator("#dob").fill("1996-10-12") // when type date then formate yyyy-mm-dd
    await expect(page.locator("#dob")).toHaveValue("1996-10-12");

    await page.waitForTimeout(2000)
});
