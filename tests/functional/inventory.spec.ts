import { test, expect } from "@playwright/test";
/*
scenario
1. Login as standard user
2. git a list of products wiuth its price and title
3. Assert that all products have non zero price

.inventory_item --> all products
.inventory_item_name --> product title
.inventory_item_price --> product price
 */
test.describe("Inventory feature", () => {
  test.beforeEach("Login with valid cred", async ({ page }) => {
    // Launch url and verify title and header text
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveTitle("Swag Labs");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/)
  });

  test("Should validate that all products have non zero price", async ({page}) => {
    // get a list of products
    const productsElms = page.locator(".inventory_item");
    await expect(productsElms).toHaveCount(6);

    // get product name and price
    const productsCount = await productsElms.count();
    for(let i=0; i<productsCount; i++){
        const productTitle = await productsElms.nth(i).locator(".inventory_item_name").textContent();
        const productPrice = await productsElms.nth(i).locator(".inventory_item_price").textContent();
        console.log(`Product: ${productTitle} - Price: ${productPrice}`);
        // Assert that price is not zero
        const priceValue = parseFloat(productPrice?.replace("$", "") || "0");
        expect(priceValue).toBeGreaterThan(0);

    }

  });
});
