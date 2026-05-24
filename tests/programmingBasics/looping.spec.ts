import{test,expect} from '@playwright/test';

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
test.only("for loop - dropdown example",async({page})=>{
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