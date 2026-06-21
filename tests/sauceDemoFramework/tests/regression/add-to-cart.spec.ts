import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Sauce Demo Regression Tests', () => {
  test('add product to cart and validate cart contents', {
    tags: ['@regression'],
  }, async ({ loginPage, productsPage, cartPage, sauceDemoData }) => {
    await loginPage.goto();
    await loginPage.assertLoginPageVisible();
    await loginPage.login(sauceDemoData.credentials.standard.username, sauceDemoData.credentials.standard.password);

    await productsPage.assertInventoryPageLoaded();
    await productsPage.addProductToCart(sauceDemoData.products.fleeceJacket);

    await test.step('Verify cart badge increments', async () => {
      expect(await productsPage.getCartBadgeCount()).toBe('1');
    });

    await productsPage.openCart();
    await cartPage.assertCartPageLoaded();

    const cartItems = await cartPage.getCartItems();
    expect(cartItems).toContain(sauceDemoData.products.fleeceJacket);
  });
});
