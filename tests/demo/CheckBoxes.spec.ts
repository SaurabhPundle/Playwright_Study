import { test, expect } from "@playwright/test";

test("Checkbox Validation", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/check-box.php",
  );
  await page.locator("#bs_1 .plus").first().click();
  await expect(page.locator("#c_bs_1")).not.toBeChecked();
  await expect(page.locator("#c_bf_1")).not.toBeChecked();
  await expect(page.locator("#c_bf_2")).not.toBeChecked();
  await page.locator("#c_bs_1").check();
  await expect(page.locator("#c_bs_1")).toBeChecked();
  await expect(page.locator("#c_bf_1")).toBeChecked();
  await expect(page.locator("#c_bf_2")).toBeChecked();
  await page.locator("#c_bf_1").uncheck();
  await expect(page.locator("#c_bs_1")).not.toBeChecked();
});
test.only('check boxes in amazon',async({page})=>{
    await page.goto("https://www.amazon.in/");
    await page.locator("#twotabsearchtextbox").fill("books");
    await page.locator("#nav-search-submit-button").click();
    await page.waitForSelector('h2.a-size-base span.a-text-bold');
    await expect(page.locator('h2.a-size-base span.a-text-bold')).toContainText(/books/);
    
    await page.locator("//span[text()='Hardcover']").click();
    const elements =page.locator("div[data-cy='price-recipe'] a.a-text-bold").all(); // uesd to get all elements
    for (const element of await elements) {
      await expect(element).toContainText("hardcover");
    }

});
