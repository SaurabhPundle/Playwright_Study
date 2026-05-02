import{test,expect}from '@playwright/test';
import {loginPage} from './sauceDemoPages/loginPage';
import { products } from './sauceDemoPages/product';
import { checkOutPage } from './sauceDemoPages/checkoutPage';

test("user should able to login with valid credentials", async({page})=>{
 const login = new loginPage(page); // in order to use the functions of loginPage class, we need to create the object of that class
 const product = new products(page);
 const cart = new checkOutPage(page);
 await login.navigate("https://www.saucedemo.com/");
 await login.waitForLoad();
 await login.loginTo("standard_user","secret_sauce");
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

const isProduct = await product.isProductVisible();
expect(isProduct).toBeTruthy()
const isLogo = await product.isLogoPresent();
expect(isLogo).toBeTruthy();
await product.validatedProductDetails();
await product.addToCartByName("Sauce Labs Fleece Jacket");
await product.clickOnCheckoutButton();
const productNmae = await cart.getProductNameInCart();
expect(productNmae).toBe("Sauce Labs Fleece Jacket");
});
