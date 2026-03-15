import { test, expect } from "@playwright/test";

test.describe("Make Appointment functionality", () => {
  test.beforeEach("Login with valid cred", async ({ page }) => {
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
    // Login with valid credentials
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Should make an appointment with non-default values", async ({
    page,
  }) => {
    // dropdown
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page
      // checkbox
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
    //   radio button
    await page.getByText("Medicaid").click();
    // data input box
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .fill("05/10/2027");
      
    // await page
    //   .getByRole("textbox", { name: "Visit Date (Required)" })
    //   .press("Enter");
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    // multiline comment box
    await page.getByRole("textbox", { name: "Comment" }).click();

    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("Captured by codegen");
    //   submit form
    await page.getByRole("button", { name: "Book Appointment" }).click();
    // assertion
  
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });

  //   more tests go here
});
