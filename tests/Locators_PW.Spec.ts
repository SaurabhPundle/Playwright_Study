import {test , expect, Locator} from '@playwright/test'

test('Verify Playwright Locators' , async({page})=>{
    
    await page.goto('https://demo.nopcommerce.com/');
    // 1. page.getByAltText for images
    const logo:Locator = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible(); 

    // 2. page.getByText for text it contains/substring

    // const text:Locator = page.getByText("Welcome to our store");  // full string/substring

    const text:Locator = page.getByText(/Welcome\s+tO\s+oUr\s+sToRe/i);  // reguar Expresssion with ogone case 
    await expect(text).toBeVisible();

});