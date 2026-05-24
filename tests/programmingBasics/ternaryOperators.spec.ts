import {test , expect} from '@playwright/test'
// npx playwright test --config=config/test.playwright.config.ts tests/programmingBasics/ternaryOperators.spec.ts --headed 
test("Ternary operator",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.locator("[type='submit']").click();

    await page.waitForSelector('.oxd-topbar-header-breadcrumb-module');
    const text = await page.locator(".oxd-topbar-header-breadcrumb-module").textContent();
    console.log(text);

    text?.includes("Dashboa_rd")? await page.locator("button[title='Timesheets']").click()
    : console.log("Login is not successful")
})

test.only("ternary 2 with amazon",async({page})=>{
    await page.goto("https://www.amazon.in");
    await page.getByPlaceholder("Search Amazon.in").fill("pen");
    await page.keyboard.press("Enter");
    await page.waitForSelector("[data-cy='reviews-ratings-slot']");
    const ratingText = await page.locator("[data-cy='reviews-ratings-slot']").first().textContent();
    console.log(ratingText)

    const rating = parseFloat((ratingText?? "0").split(' ')[0]) // Nullish Coalescing Operator (??)
    console.log(rating)

    rating > 3 ? console.log(`Rating is greater than 4, actual rating is ${rating}`) : console.log(`Rating is less than 4, actual rating is ${rating}`)
    rating > 3 ? page.locator("[data-cy='reviews-ratings-slot']").filter({hasNotText:'sponsored'}).first().click()
    : console.log("Rating is less than 4")

})