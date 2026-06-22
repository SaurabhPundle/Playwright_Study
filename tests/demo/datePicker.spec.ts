import { test, expect } from "@playwright/test";
// npx playwright test --config=config/test.playwright.config.ts tests/demo/datePicker.spec.ts --headed
test("date picker by fill", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php",
  );
  await page.locator("#dob").fill("1996-10-12"); // when type date then formate yyyy-mm-dd
  await expect(page.locator("#dob")).toHaveValue("1996-10-12");

  await page.waitForTimeout(2000);
});

test("date picker", async ({ page }) => {
  await page.goto("https://www.globalsqa.com/demo-site/datepicker/");
  const frame = page.frameLocator(
    "iframe[src='../../demoSite/practice/datepicker/default.html']",
  );
  await frame.locator("#datepicker").click();
  await frame.locator("text='12'").click();
  await expect(frame.locator("#datepicker").nth(0)).toHaveValue("06/12/2026");

  // pass current date
  const currentDate = new Date();
  const day = String(currentDate.getDate());
  await frame.locator("#datepicker").click();
  await frame.locator(`text="${day}"`).click();

  const month = String(currentDate.getMonth() + 1); // getMonth() is zero-based
  const year = String(currentDate.getFullYear());

  const expectedDate = `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
  await expect(frame.locator("#datepicker").nth(0)).toHaveValue(expectedDate);

  const yearToSelect = "2024";
  const monthToSelect = "May";
  const dayToSelect = "15";

  await frame.locator("#datepicker").click();
  while (true) {
    const displayedYear =
      (await frame.locator(".ui-datepicker-year").textContent()) || "0";
    console.log("Displayed Year:", displayedYear);
    if (displayedYear.trim() === yearToSelect) {
      break;
    }
    if (parseInt(displayedYear) < parseInt(yearToSelect)) {
      await frame.locator(".ui-datepicker-next").click();
    } else {
      await frame.locator(".ui-datepicker-prev").click();
    }
  }

  while (true) {
    const displayedMonth =
      (await frame.locator(".ui-datepicker-month").textContent()) || "";
    console.log("Displayed Month:", displayedMonth);
    if (displayedMonth.trim() === monthToSelect) {
      break;
    }
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const displayedMonthIndex = monthNames.indexOf(displayedMonth.trim());
    const monthToSelectIndex = monthNames.indexOf(monthToSelect);
    if (displayedMonthIndex < monthToSelectIndex) {
      await frame.locator(".ui-datepicker-next").click();
    } else {
      await frame.locator(".ui-datepicker-prev").click();
    }
  }

  await frame.locator(`text="${dayToSelect}"`).click();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthNumber = String(monthNames.indexOf(monthToSelect) + 1).padStart(2, "0");
  const expectedSelectedDate = `${monthNumber}/${dayToSelect.padStart(2, "0")}/${yearToSelect}`;
  await expect(frame.locator("#datepicker").nth(0)).toHaveValue(expectedSelectedDate);

  await page.waitForTimeout(4000);
});
