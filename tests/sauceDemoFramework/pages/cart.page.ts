import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  private get cartTitle() {
    return this.page.locator('.title');
  }

  private get cartItems() {
    return this.page.locator('.cart_item');
  }

  private get checkoutButton() {
    return this.page.locator('#checkout');
  }

  async assertCartPageLoaded() {
    await expect(this.cartTitle, 'Cart title should be visible on cart page').toHaveText('Your Cart', { timeout: 10000 });
    await expect(this.page).toHaveURL(/cart\.html$/);
  }

  async getCartItems() {
    const count = await this.cartItems.count();
    const names = [] as string[];

    for (let index = 0; index < count; index += 1) {
      const productName = (await this.cartItems.nth(index).locator('.inventory_item_name').textContent())?.trim() ?? '';
      if (!productName) {
        throw new Error(`Cart item at index ${index} does not have a visible product name`);
      }
      names.push(productName);
    }

    return names;
  }

  async continueToCheckout() {
    await this.click(this.checkoutButton, 'checkout button');
  }
}
