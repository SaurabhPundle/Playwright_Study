import { test, expect } from "@playwright/test";
// npx playwright test --config=config/test.playwright.config.ts tests/demo/dropdown.spec.ts --headed
test("simple dropdown", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php",
  );
  // await page.locator("#state").selectOption("NCR"); //using value
  // await page.locator("#state").selectOption({label:"Uttar Pradesh"}); //using label
  // await page.locator("#state").selectOption({index:3}); //using index

  // await page.selectOption("#state","Rajasthan"); //using value

  // const selectedOption = await page.locator("#state").inputValue(); //using value
  // expect(selectedOption).toBe("Rajasthan");

  //  const selectedOption = await page.locator("#state option:checked").textContent(); //using textContent
  //     expect(selectedOption).toBe("Rajasthan");

  // check defalut selected option

  // const selectedOption = await page.locator("#state option:checked").textContent(); //using textContent
  // expect(selectedOption).toBe("Choose State");

  const countOfElements = await page.locator("#state option").count();
  console.log("Count of options in dropdown: " + countOfElements);
  await expect(countOfElements).toBe(5);
  await page.waitForTimeout(10000);
});
test("custom dropdown", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.locator(".oxd-topbar-header-breadcrumb")).toBeVisible();
  await expect(page.locator(".oxd-topbar-header-breadcrumb")).toHaveText(
    "Dashboard",
  );

  await page.locator(".oxd-userdropdown-name").click();
  await page.locator("[role='menuitem']", { hasText: "Support" }).click(); // filtering option
  await expect(page.locator(".orangehrm-sub-title")).toHaveText(
    "Customer Support",
  );

  await page.locator(".oxd-main-menu-item", { hasText: "Leave" }).click();

  await page.waitForSelector(".oxd-multiselect-wrapper .oxd-select-text-input");
  await page.locator(".oxd-multiselect-wrapper .oxd-select-text-input").click();
  await page.locator(".oxd-select-option", { hasText: "Cancelled" }).click();
  await page.waitForSelector(
    ".oxd-multiselect-chips-area .oxd-chip.oxd-chip--default.oxd-multiselect-chips-selected",
  );
  await expect(
    page.locator(
      ".oxd-multiselect-chips-area .oxd-chip.oxd-chip--default.oxd-multiselect-chips-selected",
      { hasText: "Cancelled " },
    ),
  ).toHaveText("Cancelled");
});

test.only("searchable dropdown", async ({ page }) => {
    await page.goto("https://www.amazon.in/");
    await page.getByPlaceholder("Search Amazon.in").fill("book");
    await page.waitForSelector(".two-pane-results-container"); // auto search result
    await expect(page.locator(".two-pane-results-container")).toBeVisible();

    const resultCount = await page.locator("[id*='sac-suggestion-row']").count();
    expect(resultCount).toBe(20);
    const allSuggetionText = await page.locator("[id*='sac-suggestion-row']").allTextContents();
    console.log(allSuggetionText);
    await expect(page.locator("[id*='sac-suggestion-row']",{hasText:"bookmark"}).first()).toBeVisible();
    page.locator("[id*='sac-suggestion-row']",{hasText:"bookmark"}).first().click();
    await expect(page).toHaveTitle("Amazon.in : bookmark");

    const allSuggestions = await page.locator("[id*='sac-suggestion-row']").all();

        for (const suggestion of allSuggestions) {
            const text = await suggestion.textContent();
            if(text && text.includes("book mark")) {
                await suggestion.click();
                break;
            }
        }
});
