import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Sauce Demo Functional Tests', () => {
  test('complete checkout for a single product', {
    tags: ['@functional'],
  }, async ({ loginPage, productsPage, cartPage, checkoutPage, sauceDemoData }) => {
    await loginPage.goto();
    await loginPage.assertLoginPageVisible();
    await loginPage.login(sauceDemoData.credentials.standard.username, sauceDemoData.credentials.standard.password);

    await productsPage.assertInventoryPageLoaded();
    await productsPage.addProductToCart(sauceDemoData.products.backpack);
    await productsPage.openCart();

    await cartPage.assertCartPageLoaded();
    await test.step('Continue to checkout and enter shipping details', async () => {
      await cartPage.continueToCheckout();
      await checkoutPage.assertCheckoutInformationVisible();
      await checkoutPage.provideShippingDetails(
        sauceDemoData.checkout.firstName,
        sauceDemoData.checkout.lastName,
        sauceDemoData.checkout.postalCode,
      );
    });

    await test.step('Finish the checkout flow and verify completion', async () => {
      await checkoutPage.finishCheckout();
      await checkoutPage.assertOrderCompleted();
    });
  });
});
