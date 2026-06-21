import { test, expect } from "@playwright/test";
// npx playwright test --config=config/test.playwright.config.ts tests/demo/webtable.spec.ts --headed
test("handling webtable", async ({ page }) => {
  await page.goto("https://letcode.in/table/");
  await expect(page.locator("#shopping")).toBeVisible();

  const rowCount = await page.locator("#shopping tbody tr").count(); // num of rows
  expect(rowCount).toBe(4);

  const columnCount = await page.locator("#shopping thead th").count(); // num of columns
  expect(columnCount).toBe(2);

  const itemName = await page
    .locator("#shopping tbody tr:nth-child(2) td:nth-child(1)")
    .textContent();
  expect(itemName).toBe("Apple");

  const itemPrice = await page
    .locator("#shopping tbody tr:nth-child(2) td:nth-child(2)")
    .textContent();
  expect(itemPrice).toBe("180");

  const expectedColumnNames = ["Items", "Price"];
  const actualColumnNames = await page
    .locator("#shopping thead th")
    .allTextContents();
  expect(actualColumnNames).toEqual(expectedColumnNames);
});

test("handling webtable with checkbox", async ({ page }) => {
    await page.goto("https://letcode.in/table");
    await expect(page.locator("#simpletable")).toBeVisible();
    const name = "koushik"
    const row = page.locator("#simpletable tbody tr").filter({hasText:name});
    await row.locator("input[type='checkbox']").check();
    await expect(row.locator("input[type='checkbox']")).toBeChecked();

    // multiple checkboxes selection
    const namesToSelect = ["koushik", "Yashwant", "Iron"];
    for (const name of namesToSelect) {
        const row = page.locator("#simpletable tbody tr").filter({hasText:name});
        await row.locator("input[type='checkbox']").check();
        await expect(row.locator("input[type='checkbox']")).toBeChecked();
    }

});

/*test.only("webtable with multiple data", async ({ page }) => {
    await page.goto("https://letcode.in/table");
    await expect(page.getByRole('cell', { name: 'Calories' })).toBeVisible();
    // find which column is "Calories" and then get all values from that column
    const headers = await page.locator('.mat-sort thead tr th').allTextContents();
    const colIndex = headers.findIndex(h => h.trim() === 'Calories');
    expect(colIndex).toBeGreaterThanOrEqual(0);

    const rows = page.locator('.mat-sort tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    const caloriesNums: number[] = [];
    for (let i = 0; i < rowCount; i++) {
      const cell = rows.nth(i).locator(`td:nth-child(${colIndex + 1})`);
      const text = (await cell.textContent()) || '';
      const n = Number(text.replace(/[^0-9.-]/g, '').trim());
      expect(Number.isNaN(n)).toBeFalsy();
      expect(n).toBeGreaterThan(0);
      caloriesNums.push(n);
    }
    console.log('Calories:', caloriesNums);
    
}); */
