import { test, expect, Page } from "@playwright/test";
// npx playwright test --config=config/test.playwright.config.ts tests/demo/describeBlock.spec.ts --headed
// to run single describe block
//npx playwright test -g "cart page functionality" --config=config/test.playwright.config.ts tests/demo/describeBlock.spec.ts --headed
// make reusable function
async function login(page: Page) {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.locator("#login-button").click();
  await expect(page.locator(".app_logo")).toBeVisible({ timeout: 5000 });
  await expect(page.locator(".header_secondary_container")).toBeVisible();
}

test.describe("Login functionality", () => {
  test("valid credentials", async ({ page }) => {
    await login(page);
  });

  test("invalid credentials", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").fill("standar_d_user");
    await page.getByPlaceholder("Password").fill("secre_t_sauce");
    await page.locator("#login-button").click();
    await page.waitForSelector("h3[data-test='error']");
    await expect(page.locator("h3[data-test='error']")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator("h3[data-test='error']")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
});


test.describe("product page", () => {
  test("add product", async ({ page }) => {
    await login(page);
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
  });
});

test.describe("cart page functionality", () => {
  test("validate cart page", async ({ page }) => {
    await login(page);
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator(".title")).toHaveText("Your Cart");
  });

  test("validate checkout page", async ({ page }) => {
    await login(page);
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator(".title")).toHaveText("Your Cart");
    await page.locator("#checkout").click();
    await expect(page.locator(".title")).toHaveText(
      "Checkout: Your Information",
    );
  });
});
