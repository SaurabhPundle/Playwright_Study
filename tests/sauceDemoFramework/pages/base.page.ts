import { Locator, Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    try {
      await this.page.goto(path, { waitUntil: 'load' });
    } catch (error) {
      throw new Error(`Navigation failed for ${path}: ${error}`);
    }
  }

  async click(locator: Locator, name = 'element') {
    try {
      await locator.waitFor({ state: 'visible', timeout: 10000 });
      await locator.click();
    } catch (error) {
      throw new Error(`Unable to click ${name}: ${error}`);
    }
  }

  async fill(locator: Locator, value: string, name = 'field') {
    try {
      await locator.waitFor({ state: 'visible', timeout: 10000 });
      await locator.fill(value);
    } catch (error) {
      throw new Error(`Unable to fill ${name}: ${error}`);
    }
  }

  async getText(locator: Locator, name = 'element') {
    try {
      await locator.waitFor({ state: 'visible', timeout: 10000 });
      return (await locator.textContent())?.trim() ?? '';
    } catch (error) {
      throw new Error(`Unable to read text from ${name}: ${error}`);
    }
  }

  async isVisible(locator: Locator) {
    return locator.isVisible();
  }
}
