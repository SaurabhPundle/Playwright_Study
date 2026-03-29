import { test, expect } from "@playwright/test";
import { time } from "console";

test.describe("Login functionality", () => {
  test.beforeEach(async ({ page }) => {
    // Launch url and verify title and header text
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator(".text-vertical-center h1")).toHaveText(
      "CURA Healthcare Service",
    );
    // Click on Make Appointment and verify login page
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(
      page.getByText("Please login to make appointment."),
    ).toBeVisible();
  });

  test.only("Should login successfully", async ({ page }) => {

    /* 1.Just locator element  --> Lazy
      No action proves that element is lazy
     2. Invalid locator on action method 
      Error: locator.fill: Test timeout of 80000ms exceeded.
      3. Valid locator on invalid action method
      Error: locator.check: Target is not a checkbox or radio button
        4. Valid locator on expect method
       Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected) 
       Expected: "Make Appointment"
    */
    // auto waiting
    // let userNameEle = page.getByLabel("Username");
    // await userNameEle.check();
    //   Successfull Login

    // timeout
    test.slow();
    test.setTimeout(40_000);
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click({ timeout: 10000 }); // will run over config timeout
    // Assert a text
    await expect(page.locator("h2")).toHaveText("Make Appointment",{ timeout: 10_000 });
  });
  test("Should prevent login with incorrect credentials", async ({ page }) => {
    // Unsuccessfull Login
    await page.getByLabel("Username").fill("John Smith");
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click({ timeout: 10000 });
    // Assert a error message
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
