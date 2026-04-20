import{test,expect} from '@playwright/test';
// npx playwright test --config=config/test.playwright.config.ts tests/demo/frames.spec.ts --headed
test('handling frames',async({page})=>{
    await page.goto("https://testpages.eviltester.com/pages/embedded-pages/frames/");
    //page.frame() count number of frames present on the webpage
    const countOfFrames =  page.frames();

    //     countOfFrames.forEach((frame)=>{
    //         console.log("Frame url: "+frame.url());
    //     });

    // console.log("Count of frames on webpage: "+countOfFrames.length);

    // // using name attribute of frame to switch to frame
    // const leftFrame = page.frame({name:"left"});
    
    //  if (leftFrame){
    //    const leftFrameVis =  leftFrame.waitForSelector("h1",{state:"visible"});
    //    const text = leftFrame.locator("h1").textContent();
    //    console.log("Text in left frame: "+text);
    //    await expect(leftFrame.locator("h1")).toHaveText("Left");

    //  }
    //  else{
    //     console.error(`Frame not found, name is`+leftFrame);
    //  }


// using url to switch to frame
    
// const frameMiddle = page.frame({url:"/frame-includes/middle.html"});

//     if(frameMiddle){
//         const middleFrameVis = await frameMiddle.waitForSelector("h1",{state:"visible"});
//         const text = await frameMiddle.locator("h1").textContent();
//         console.log("Text in middle frame: "+text);
//         await expect(frameMiddle.locator("h1")).toHaveText("Middle");
//      }
//      else{
//         console.error(`Frame not found, url is`+frameMiddle);
//      }

// using index

const frameRight = countOfFrames[4]; //index
await expect(frameRight.locator("h1")).toHaveText("Right");
});

test.only('handling nested frames',async({page})=>{

await page.goto("https://play1.automationcamp.ir/frames");
const parentFrame = page.frameLocator("#frame1") // using id of frame
const frame2 = parentFrame.frameLocator("#frame2");
await frame2.locator("#click_me_2").click();
await expect(frame2.locator("#click_me_2")).toHaveText("Clicked");
await page.waitForTimeout(2000);
});