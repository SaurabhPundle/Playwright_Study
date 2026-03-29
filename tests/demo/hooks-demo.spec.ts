import{test,expect}from'@playwright/test';
import { promiseHooks } from 'v8';

test.beforeAll("Before All Hook",async()=>{
    console.log("This is Before All Hook");  // should run just once per worker
});

test.beforeEach("Before Each Hook",async()=>{
    console.log("This is Before Each Hook");  // should run 4 times
});         

test.describe("test suite 1",()=>{  
// beforeAll hook 
test.beforeAll("Before All Hook in test suite 1",async()=>{
    console.log("This is Before All Hook in test suite 1"); // 1 x
});

// beforeEach hook
test.beforeEach("Before Each Hook in test suite 1",async()=>{
    console.log("This is Before Each Hook in test suite 1"); // 3 x
});

// test case 1
test("Test Case 1",async({page})=>{
    await page.goto("https://google.com/");
    console.log("This is Test Case 1");
}); 

// test case 2
test("Test Case 2",async({page})=>{
    await page.goto("https://bing.com/");
    console.log("This is Test Case 2");
});

// test case 3
test("Test Case 3",async({page})=>{
    await page.goto("https://duckduckgo.com/");
    console.log("This is Test Case 3"); 

});
});

test.describe("test suite 2",()=>{ 
// beforeEach hook
test.beforeEach("Before Each Hook in test suite 2",async()=>{
    console.log("This is Before Each Hook in test suite 2");    // should run 1 x
}); 
// test case 1
test("Test Case 1",async({page})=>{
    await page.goto("https://yahoo.com/");
    console.log("This is Test Case 1 in test suite 2"); // should run 1 x
});     
});

test.afterEach("After Each Hook",async()=>{
    console.log("This is After Each Hook"); // should run 4 times
}); 
