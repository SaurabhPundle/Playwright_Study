import { test, expect, devices } from "@playwright/test";
import constants from "../../data/constants.json";
import { log } from "../helpers/logger";

test("Should load homepage with correct title", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  await expect(page).toHaveTitle("CURA Healthcare Service");

  await expect(page.locator(".text-vertical-center h1"))
    .toHaveText("CURA Healthcare Service");
});

test("should click heading successfully", { tag: "@smoke" }, async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("heading", { name: "We Care About Your Health" }).click();
});

test("should validate login message", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();

  await expect(
    page.getByText("Please login to make appointment.")
  ).toBeVisible();
});

test("should demo devices", async () => {
  console.log(`Devices: ${Object.keys(devices)}`);
});

test("parallel test 1", { tag: "@demo" }, async ({ page }) => {
  await page.goto("https://www.google.com");
});

test("parallel test 2", { tag: "@demo" }, async ({ page }) => {
  await page.goto("https://www.amazon.com");
});

test("should read constant data", async () => {
  console.log(`Constants: ${JSON.stringify(constants.STATUSCODES)}`);
});

test.only("demo of click action", async ({ page },testInfo) => {

  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  let ele = page.getByRole("link", { name: "Make-Appointment" })
  // default action
  
  // await ele.click();

  // base page action
  try{
              await expect(ele).toBeVisible({timeout:10_000});
              await ele.click();
  
          }
          catch(error){
              await log("Error",`Failed to click on element:${ele.toString()},Error is ${error}`);
              throw error; // rethrow to fail the test
          }
  });