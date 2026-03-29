import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";

test.describe("Make Appointment functionality", () => {
  test.beforeEach("Login with valid cred", async ({ page }, testInfo) => {
    // Launch url and verify title and header text
    // get url from config
    const envConfig = testInfo.project.use as any; // cast to any to access custom config properties
    await page.goto(envConfig.appURL);

    // custom logger example
    await log("Info",`Launching web app in ${envConfig.envName} environment`);
  
    // await page.goto("https://katalon-demo-cura.herokuapp.com/");
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
    console.log("ENV DEBUG:", process.env.TEST_USER_NAME);
    await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
    await page.getByLabel("Username").press("Tab");
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    // assertion after login
    await expect(page.locator("h2")).toHaveText("Make Appointment");
// custom log example
    await log("Info","Logged in successfully, ready to make appointment");
    await log("Error","This is an error log example, just for demonstration purposes");
  });

  test("Should make an appointment with non-default values", async ({page},testInfo) => {
    console.log(`curr config at runtime:${JSON.stringify(testInfo.config)}`);
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
