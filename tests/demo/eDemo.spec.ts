import {test,expect}from '@playwright/test'

test('Launch browser',async({page})=>{
    await page.goto("https://www.google.com");
    let titleName = await page.title();
    expect(titleName).toBe("Google");


});