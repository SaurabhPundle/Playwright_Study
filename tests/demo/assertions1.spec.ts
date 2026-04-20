import{test,expect} from '@playwright/test';

test('assertion1',async({page})=>{

    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php")
    await expect(page.locator("#name")).not.toHaveValue("Test User"); // to check the input field is empty or not
    await page.locator("#name").fill("Test User")
    await expect(page.locator("#email")).not.toHaveValue("testexample@gmail.com")
    await page.locator("#email").fill("testexample@gmail.com")
    await expect.soft(page.locator("#name")).toHaveValue("Test User_1")
    await page.locator("#gender").check(); // used for radio button & check box
    await expect(page.locator("#gender")).toBeChecked(); 
    await page.locator("#hobbies").check();
    await expect(page.locator("#hobbies")).toBeChecked();

})