import {test,expect } from '@playwright/test'
test('Input Box', async ({ page }) => {
   
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
    await page.locator("#headingOne .accordion-button.collapsed").click();
    await page.getByText(" Text Box").click();
    await expect(page).toHaveTitle("Selenium Practice - Text Box");
    await expect(page.locator("#TextForm h1")).toHaveText("Text Box");
    await page.getByPlaceholder("Full Name").fill("Test User"); // method to fill the input box
    await page.fill("#fullname", "Test User"); // use page.fill only with css selector & not with default /inbuild locators
    await page.getByPlaceholder("name@example.com").fill("testuser@test.com");
    await page.getByPlaceholder("Currend Address").fill("At- Test Address , 462457");
    await page.getByPlaceholder("Password").fill("password");
    await page.locator(".btn.btn-primary").click();
    await page.waitForTimeout(4000);
});

test('Input Box - Error msg', async ({ page }) => {
   
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
    await page.locator("#headingOne .accordion-button.collapsed").click();
    await page.getByText(" Text Box").click();
    await expect(page).toHaveTitle("Selenium Practice - Text Box");
    await expect(page.locator("#TextForm h1")).toHaveText("Text Box");
   
    await page.locator(".btn.btn-primary").click();
    await expect(page.locator("#fullname-error")).toBeAttached(); // to check the error msg is visible or not
    const errorLabel =  page.locator("#fullname-error");
const errorText = await errorLabel.textContent();
    console.log("Error Label: " + errorLabel);
    console.log("Error Text: " + errorText);
     expect(errorText).toContain("This field is required.")
    await page.waitForTimeout(4000);
});

test.only('radioButton', async ({ page }) => {
   
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
    await page.locator("#headingOne .accordion-button.collapsed").click();
    await page.getByText("Radio Button").click();
    await expect(page).toHaveTitle("Selenium Practice - Radio Button");
    await expect(page.locator("form h1")).toHaveText("Radio Button");
   await expect(page.locator("input[value='igottwo']")).not.toBeChecked(); // to check the radio button is not selected
   await expect(page.locator("input[value='igotthree']")).not.toBeChecked();
   await expect(page.locator("input[value='option3']")).toBeDisabled();
   await page.locator("input[value='igottwo']").check(); // to select the radio button
   await expect(page.locator("input[value='igottwo']")).toBeChecked();
   await expect(page.locator("#check")).toHaveText("You have checked Yes")
   await page.locator("input[value='igotthree']").check();
   await expect(page.locator("input[value='igotthree']")).toBeChecked();
   await expect(page.locator("#check1")).toHaveText("You have checked Impressive")
   await expect(page.locator("#check")).not.toBeVisible();
});