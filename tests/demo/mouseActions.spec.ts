import{test,expect} from '@playwright/test';
// npx playwright test --config=config/test.playwright.config.ts tests/demo/mouseActions.spec.ts --headed
test('mouse action', async({page})=>{
// click
    await page.goto("https://play1.automationcamp.ir/mouse_events.html");
    //  await expect(page.locator("#click_type")).not.toHaveText("Click"); 
    // await page.locator("div #click_area").click();
    // // await page.click("div #click_area"); other way to click
    // await expect(page.locator("#click_type")).toHaveText("Click"); 

    //right click
    // await expect(page.locator("#click_type")).not.toHaveText("Right Click");
    // await page.locator("div #click_area").click({button:"right"});
    // // await page.click("div #click_area",{button:"right"}); // other way to right click
    // await expect(page.locator("#click_type")).toHaveText("Right-Click");

    // double click
    await expect(page.locator("#click_type")).not.toHaveText("Double-Click");
    await page.locator("div #click_area").dblclick();
    await page.dblclick("div #click_area"); // other way to double click
    await expect(page.locator("#click_type")).toHaveText("Double-Click");

    // mouse hover
    await page.locator("button.dropbtn").hover();
    // await page.hover("button.dropbtn"); // other way to hover
    await page.locator("text='Java'").click();
        await expect(page.locator("div #hover_validate")).toHaveText("Java");

        //drag and drop
        await page.dragAndDrop("#drag_source","#drop_target");
        
        // await page.locator("#drag_source").dragTo("#drop_target"); // other way to drag and drop
       await expect(page.locator("div h3")).toHaveText("Drop is successful!");
// mouse move
       await page.mouse.move(0,500);

});
