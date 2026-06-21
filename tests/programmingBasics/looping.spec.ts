import{test,expect} from '@playwright/test';
import {formData} from './formData';
import {locator} from './locators';

test("checkbox Checking in lookup", async({page})=>{
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
    let checkboxes = await page.$$("input[type='checkbox']")
    console.log(`Total Checkboxes are ${checkboxes.length}`)

    for(let i=0;i<checkboxes.length;i++){

        const isChecked = await checkboxes[i].isChecked();
        if(! isChecked)
        await checkboxes[i].check();
        expect(await checkboxes[i].isChecked()).toBe(true);  // [i] because of aary
    }
})
test("for loop - dropdown example",async({page})=>{
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");
    const selectDropdown = await page.locator("#state");
    const options = await selectDropdown.locator("option");
    const count = await options.count();
    console.log(`Total dropdown counts are ${count}`);

    let HaryanaPresent = false;
    for(let i=0; i<count;i++){
        const optionText = await options.nth(i).textContent(); // nth(i) bacause elements
        console.log(optionText);
        if(optionText?.trim() === "Haryana"){
            HaryanaPresent = true;
            selectDropdown.selectOption({label:"Haryana"});
            break;
        }
    }
    expect(HaryanaPresent).toBe(true);
    await page.waitForTimeout(5000);
})

test("for loop for gate names",async({page})=>{
    // loop for gettting values
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder("Username").first().fill("standard_user");
    await page.getByPlaceholder("Password").first().fill("secret_sauce");
    await page.locator("#login-button").click();

    const productName = await page.locator(".inventory_item_name");
    const totalItems = await productName.count();
    console.log(`Total item counts are ${totalItems}`);
    let isProductPresent = false;
    for(let i=0;i<totalItems;i++){

       const name = await productName.nth(i).innerText();
       console.log(` Product Title of ${i+1} :${name}`);
       if(name.trim() === "Sauce Labs Onesie"){
        isProductPresent = true;
       }
    }
    expect(isProductPresent).toBe(true);

})

test("for in to fill form",async({page})=>{
    await page.goto("https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php");

    for(let key in formData){
        if(locator[key]){
            await page.fill(locator[key],formData[key]);
        }
        else{
            console.log(`skipping field ${key}, no locator found`);
    
           
        }
    }
    await page.waitForTimeout(3000)
            })