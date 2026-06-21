import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  private get checkoutTitle() {
    return this.page.locator('.title');
  }

  private get firstNameField() {
    return this.page.locator('#first-name');
  }

  private get lastNameField() {
    return this.page.locator('#last-name');
  }

  private get postalCodeField() {
    return this.page.locator('#postal-code');
  }

  private get continueButton() {
    return this.page.locator('#continue');
  }

  private get finishButton() {
    return this.page.locator('#finish');
  }

  private get completeHeader() {
    return this.page.locator('.complete-header');
  }

  async assertCheckoutInformationVisible() {
    await expect(this.checkoutTitle, 'Checkout information title should be visible').toHaveText(
      'Checkout: Your Information',
      { timeout: 10000 },
    );
  }

  async provideShippingDetails(firstName: string, lastName: string, postalCode: string) {
    await this.fill(this.firstNameField, firstName, 'first name field');
    await this.fill(this.lastNameField, lastName, 'last name field');
    await this.fill(this.postalCodeField, postalCode, 'postal code field');
    await this.click(this.continueButton, 'continue button');
  }

  async finishCheckout() {
    await this.click(this.finishButton, 'finish checkout button');
  }

  async assertOrderCompleted() {
    await expect(
      this.completeHeader,
      'Order confirmation header should be visible',
    ).toHaveText('Thank you for your order!', { timeout: 10000 });
  }
}
