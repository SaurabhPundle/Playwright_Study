import { test, expect } from '@playwright/test';
// by scriptanndexecute
test('assertion demo', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle("Swag Labs");
    expect(page.url()).toBe("https://www.saucedemo.com/");
    const logo =  page.locator(".login_logo");
    await expect(logo).toBeVisible();
    const userName = page.locator("#user-name");
    await expect(userName).toBeEnabled();
    const userNameDefault = page.locator("#login_credentials h4");   //parent to child
    await expect(userNameDefault).toHaveText("Accepted usernames are:"); //exact match / full
    const passwordDefault = page.locator(".login_password h4")
    await expect(passwordDefault).toContainText("all"); // partial match
    const attributeValue = page.locator('[data-test="password"]')
    await expect(attributeValue).toHaveAttribute("placeholder","Password")
    await expect(attributeValue).toHaveClass("input_error form_input");
    await expect(page.locator("#user-name")).toHaveAttribute('name','user-name')
});