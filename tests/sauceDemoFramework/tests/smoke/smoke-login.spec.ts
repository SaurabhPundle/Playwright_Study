import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Sauce Demo Smoke Tests', () => {
  test('standard user can login and view inventory', {
    tags: ['@smoke', '@regression'],
  }, async ({ loginPage, productsPage, sauceDemoData }) => {
    await test.step('Navigate to the login page', async () => {
      await loginPage.goto();
      await loginPage.assertLoginPageVisible();
    });

    await test.step('Authenticate with valid credentials', async () => {
      await loginPage.login(sauceDemoData.credentials.standard.username, sauceDemoData.credentials.standard.password);
    });

    await test.step('Verify inventory page is loaded', async () => {
      await productsPage.assertInventoryPageLoaded();
      expect(await productsPage.getCartBadgeCount()).toBe('0');
    });
  });
});
