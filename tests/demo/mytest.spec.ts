import { test, expect } from "@playwright/test";

test("Should load homepage with correct title", async ({ page }) => {
  // Navigate to the homepage
  await page.goto("https://katalon-demawait page.getByRole('heading', { name: 'We Care About Your Health' }).click();o-cura.herokuapp.com/");

  // Assert the title of the page
  await expect(page).toHaveTitle("CURA Healthcare Service");

  //Assert header text
  await expect(page.locator(".text-vertical-center h1")).toHaveText(
    "CURA Healthcare Service",
  );
});

test("should do something", { tag: "@smoke" }, async ({ page }, testinfo) => {
  console.log("Running test: " + testinfo.title);
  await page.locator("//h1").click();
});

test.only("should demo locator", async ({ page }, testinfo) => {
  // ✔  page.getBy*() and page.locator() method returns locator object
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(
    page.getByText("Please login to make appointment."),
  ).toBeVisible();await page.getByRole('heading', { name: 'We Care About Your Health' }).click();

  await page.getByRole('heading', { name: 'We Care About Your Health' }).click();
});
