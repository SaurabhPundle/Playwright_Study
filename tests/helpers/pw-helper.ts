import{test,type Page,type Locator} from '@playwright/test';
// takes screenshot of full page and attaches it to the test report
async function takeFullPageScreenshot(page: Page, screenshotName) {
  const screenshot = await page.screenshot({fullPage: true});
     await attachScreenshot(screenshotName, screenshot);
};
// take screenshot of element and attaches it to the test report
async function takeElementScreenshot(element: Locator, screenshotName: string) {
    const screenshot = await element.screenshot();
   await attachScreenshot(screenshotName, screenshot);
}

// common attach function
async function attachScreenshot(name: string, buffer: Buffer) {
  await test.info().attach(name, {
    body: buffer,
    contentType: 'image/png',
  })
};

export {takeFullPageScreenshot, takeElementScreenshot}