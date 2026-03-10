import { test, expect } from "@playwright/test";

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

  test("Should login successfully", async ({ page }) => {
    //   Successfull Login
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    // Assert a text
    await expect(page.locator("h2")).toHaveText("Make Appointment");
  });
  test("Should prevent login with incorrect credentials", async ({ page }) => {
    // Unsuccessfull Login
    await page.getByLabel("Username").fill("John Smith");
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    // Assert a error message
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
