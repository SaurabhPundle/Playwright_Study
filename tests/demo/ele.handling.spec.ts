import { test, expect } from "@playwright/test";
import { time } from "console";
// Learning --> Button Handling --> Click✔, Press✔, Doubleclick✔, Right Click✔, Hover if link✔, Timeout if slow✔
// Learning --> TextBox Handling --> Fill✔, Press✔, Clear✔, Type✔, SlowType✔
// Learning --> Checkbox/Radio Button Handling --> Check✔, Uncheck✔
test.describe("Make Appointment functionality", () => {
  test.beforeEach("Login with valid cred", async ({ page }) => {
    // Launch url and verify title and header text
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator(".text-vertical-center h1")).toHaveText(
      "CURA Healthcare Service",
    );
    // 😊Click on Make Appointment and verify login page
    // await page.getByRole("link", { name: "Make Appointment" }).click();
    // await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
    // await page.getByRole("link", { name: "Make Appointment" }).dblclick();
    // await page.getByRole("link", { name: "Make Appointment" }).click({button:"right"});
    // await page.getByRole("link", { name: "Make Appointment" }).hover();
    await page.getByRole("link", { name: "Make Appointment" }).click({ timeout: 5000 });

    await expect(page.getByText("Please login to make appointment.")).toBeVisible();
    //😊 Login with valid credentials
    // await page.getByLabel("Username").fill("John Doe");
    // await page.getByLabel("Username").clear();
    await page.getByLabel("Username").pressSequentially("John Doe", { delay: 100 });
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
    
      // checkbox
      await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();
      await page.getByText("Apply for hospital readmission").uncheck();

    //   radio button

    await expect(page.getByText("Medicare")).toBeChecked();
    await page.getByText("Medicaid").check();
    await expect(page.getByText("Medicare")).not.toBeChecked();
    // data input box
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .fill("05/10/2027");
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .press("Enter");
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
