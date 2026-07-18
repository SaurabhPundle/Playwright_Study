import {test,expect} from '@playwright/test'

test('test Input fields',async({page})=>{
    await page.goto('https://letcode.in/edit')
await page.getByPlaceholder('Enter first & last name').fill("Saurabh Pundle")
const appendAndTab =  page.locator('[value= "I am good"]')
await appendAndTab.click()
await appendAndTab.pressSequentially(' and learning Playwright')
await page.keyboard.press('Tab')
const textContent = await page.locator('#getMe').nth(1).inputValue()
console.log(`Text is ${textContent}`)
await page.locator('#clearMe').nth(1).clear()
await expect(page.locator('#noEdit').nth(1)).toBeDisabled()



})