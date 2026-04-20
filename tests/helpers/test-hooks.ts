import {test} from '@playwright/test';
test.afterEach(async({page},testInfo)=>{
    if (testInfo.status !== testInfo.expectedStatus){
        const screenShot = await page.screenshot();

        for (const attachment of testInfo.attachments){
            if (attachment.name === 'screenShot' && attachment.path){
        await testInfo.attach("Failure Screenshot",{
            body: screenShot,
            contentType: "image/png",
        });
            }
        }
    }
});