import { Page } from "@playwright/test";
import { basePage } from "./basePage";
// npx playwright test --config=config/test.playwright.config.ts tests/loginToSauceAdv.spec.ts --headed
export class products extends basePage {
  constructor(page: Page) {
    super(page);
  }
  private productPageTitle = ".title";
  private logo = ".app_logo";
  private productList = ".inventory_item";
  private productName = ".inventory_item_name";
  private prodctDescription = ".inventory_item_desc";
  private productPrice = ".inventory_item_price";
  private addToCart = ".btn_primary.btn_small.btn_inventory";
  private checkoutButton = ".shopping_cart_link";

  async isProductVisible(): Promise<boolean> {
    return await this.page.locator(this.productPageTitle).isVisible();
  }
  async isLogoPresent(): Promise<boolean> {
    return await this.page.locator(this.logo).isVisible();
  }
  async validatedProductDetails() {
    const product = await this.page.locator(this.productList).count();
    console.log(`Number of products : ${product}`);

    for (let i = 0; i < product; i++) {
      const title = await this.page
        .locator(this.productList)
        .nth(i)
        .locator(this.productName)
        .innerText();
      console.log(`Product ${i + 1} Title: ${title}`);
      if (!title) {
        throw new Error(`Product ${i + 1} is missing title`);
      }
      const description = await this.page
        .locator(this.productList)
        .nth(i)
        .locator(this.prodctDescription)
        .innerText();
      console.log(`Product ${i + 1} description : ${description}`);
      if (!description) {
        throw new Error(`Product ${i + 1} is missing description`);
      }
      const price = await this.page
        .locator(this.productList)
        .nth(i)
        .locator(this.productPrice)
        .innerText();
      console.log(`Product ${i + 1} Price : ${price}`);
      if (!price) {
        throw new Error(`Product ${i + 1} is missing price`);
      }
      const addToCart = await this.page
        .locator(this.productList)
        .nth(i)
        .locator(this.addToCart)
        .innerText();
      console.log(`Product ${i + 1} Add To Cart: ${addToCart}`);
      if (!addToCart) {
        throw new Error(`Product ${i + 1} is missing addToCart`);
      }
    }
  }
  async addToCartByName(targetProductName: string) {
    const productNameCnt = await this.page.locator(this.productList).count();
    for (let i = 0; i < productNameCnt; i++) {
      const product = this.page.locator(this.productList).nth(i);
      const name = await product.locator(this.productName).textContent();
      console.log(`Name : ${name}`);
      if (name.trim() === targetProductName) {
        await product.locator(this.addToCart).click();
        console.log(`Product ${targetProductName} is added to cart`);

        return;
      }
    }
    throw new Error(`Product ${targetProductName} is not found on page`);
  }
  async clickOnCheckoutButton() {
    await this.page.locator(this.checkoutButton).click();
  }
}
