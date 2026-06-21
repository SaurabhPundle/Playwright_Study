import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  private get pageTitle() {
    return this.page.locator('.title');
  }

  private get productItems() {
    return this.page.locator('.inventory_item');
  }

  private get cartButton() {
    return this.page.locator('.shopping_cart_link');
  }

  private get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  async assertInventoryPageLoaded() {
    await expect(this.pageTitle, 'Inventory title should be visible').toBeVisible({ timeout: 10000 });
    await expect(this.page).toHaveURL(/inventory\.html$/);
  }

  async getProductTitles() {
    const count = await this.productItems.count();
    const titles = [] as string[];

    for (let index = 0; index < count; index += 1) {
      const productRow = this.productItems.nth(index);
      const title = (await productRow.locator('.inventory_item_name').textContent())?.trim() ?? '';
      if (!title) {
        throw new Error(`Product at index ${index} does not have a visible title`);
      }
      titles.push(title);
    }

    return titles;
  }

  async addProductToCart(productName: string) {
    const count = await this.productItems.count();

    for (let index = 0; index < count; index += 1) {
      const productRow = this.productItems.nth(index);
      const title = (await productRow.locator('.inventory_item_name').textContent())?.trim() ?? '';

      if (title === productName) {
        const addButton = productRow.locator('button.btn_primary.btn_small.btn_inventory');
        await this.click(addButton, `Add to cart button for ${productName}`);
        return;
      }
    }

    throw new Error(`Product '${productName}' was not found on the inventory page`);
  }

  async openCart() {
    await this.click(this.cartButton, 'cart button');
  }

  async getCartBadgeCount() {
    if (await this.cartBadge.isVisible()) {
      return (await this.cartBadge.textContent())?.trim() ?? '0';
    }
    return '0';
  }
}
