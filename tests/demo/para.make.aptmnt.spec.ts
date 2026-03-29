import { test, expect } from "@playwright/test";
import path from "path";
import fileHelper from "../helpers/file-helper";

// const makeApptTestData = TestData.makeAppointmentTestData(); // return three objects of data
const csvFilePath = path.resolve(`${process.cwd()}/data/functional/make-aptmnt-test-data.csv`);
const makeApptTestData = fileHelper.readCSVFile(csvFilePath); // return three objects of data from csv file
console.log(`test data at runtime:${JSON.stringify(makeApptTestData)}`);
//access data
for (const data of makeApptTestData) {
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

      //  get login cookie and set it to global variable for later use in other tests

      const cookies = await page.context().cookies();
      process.env.LOGIN_COOKIES = JSON.stringify(cookies);
    });

    test(`${data.testId}: Should make an appointment with non-default values`, async ({
      page,
    }, testInfo) => {
      console.log(`cookies at runtime:${process.env.LOGIN_COOKIES}`);
      // console.log(`curr config at runtime:${JSON.stringify(testInfo.config)}`);
      // dropdown
      console.log("FACILITY VALUE:", data.facility);
      await page.getByLabel("Facility").selectOption(data.facility);
      await page
        // checkbox
        .getByRole("checkbox", { name: "Apply for hospital readmission" })
        .check();
      //   radio button
      await page.getByText(data.hcp).click();
      // data input box
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .click();
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .fill(data.date);
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .press("Enter");
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .click();
      // multiline comment box
      await page.getByRole("textbox", { name: "Comment" }).click();
      await page
        .getByRole("textbox", { name: "Comment" })
        .fill("Captured by codegen");
      //   submit form
      await page.getByRole("button", { name: "Book Appointment" }).click();
      // assertion
      await expect(page.locator("h2")).toContainText(
        "Appointment Confirmation",
      );
      await expect(
        page.getByRole("link", { name: "Go to Homepage" }),
      ).toBeVisible();
    });

    //   more tests go here
  });
}
