***** playwright with TS  by script and execute ******
- Powerful tool to automate web browsers

Features of Playwright
1. Auto wait
2. Muti tab and multi window support
3. Mobile emulation
4. Built in assertion
5. Headless testing
6. cross language --> javascript , java, python c#
7. Frame and shadow dom support 
8. Fast Execution (talk directly to browser , no middle layer) Chrome browser --> dev tools protocal , firefox/safari -> own search engine
9. Parallel testing
10. cross browser
11. Community and documentation

==================
Installation

* Node.js --> from google.com
* Vscode --> from google.com
* npm init playwright@latest --> vs terminal
+ default folders 
node_modules
tests
tests-examples
gitignore
package-lock.json
package.json
playwright.config.ts

* npx playwright test

Code generation --> manual/codegen
spec for specification/file used for testing purpose
ts for TypeScript
impors are present in node_modules
test > to create and organize test cases
expect > used for assertion
async > asynchronus function > allows the code to pass and wait for certain task to finish besoore continue using await keyword
page > parameter > referes to tab of browser/indivisual browser 

globalSetup --> Run this file once before all tests start 
Used for common preparation
eg. login once and savesession, create test data, set env variables, start server/db connection
globalTeardown  --> Run this file once after all tests finish
Used for cleanup
eg. delete test data, close db connection,stop server, clear cache

golbalSetup --> run all tests --> globalTeardown

required.resolve("path")  --> converts the file path into an absolute path
to correctly locate the file
to avoid path issues
"globalSetup is used to run initialization logic once before all tests, like login or data setup. globalTeardown is used to clean up after all tests finish, like deleting data or closing connections."

✔ Cache --> cache is temporary storage of data so it can be reused quickly instead of loading again
First time you open a website → it loads images, CSS, JS (slow)
Second time → loads faster
Why? Because of cache
Cache stores
Files (images, JS, CSS)
API responses
Data from previous operations
So system doesn’t need to:
hit server again
recompute again

In Playwright (Important 🔥)

Cache is related to:

👉 Browser context / storage

Example:

await context.storageState({ path: 'state.json' });

👉 This is like caching:

login session
cookies
localStorage

So you don’t login again every test

🔹 Types of Cache
Browser cache
Memory cache
Disk cache
CDN cache (server side)
🔹 Why Cache is important?

✅ Faster performance
✅ Less server load
✅ Better user experience

⚠️ Problem with Cache

Sometimes cache causes issues:

Old data shown
UI not updated
Tests fail unexpectedly
🔧 In Playwright (very useful)

To disable cache:

await context.newPage({ bypassCSP: true });

Or use:

context = await browser.newContext({
  ignoreHTTPSErrors: true,
});

You can say:
"Cache is temporary storage that stores frequently used data so it can be accessed faster instead of fetching or computing it again."

✔.env

✔npx playwright test tests/path --project=cromium

✔Worker 
A parallel test runner process that executes your tests.
Node.js process
Has its own:
Browser instance
Test environment
Runs tests independently
we can define it in config file or CLI
npx playwright test --workers=2
default workers = Number of CPU cores
Isolation

Each worker:
Does NOT share data with others
Runs in clean environment

 Parallel execution
More workers = faster execution ⚡
But too many = system overload ❌

test.describe.configure({ mode: 'serial' });
👉 Forces tests to run in same worker (one by one)

💡 Best Practice
Small project → workers: 2–3
Big CI pipeline → use more workers
Debugging → use workers: 1

A worker in Playwright is a separate process that runs tests in parallel. Each worker has its own browser instance and environment, allowing faster and isolated test execution.

Worker 👨‍💻 → Employee doing work
Parallel ⚡ → Employees working at same time
Shard 🏢 → Work divided across offices
Project 🌍 → Same work in different countries
🎯 Perfect Interview Answer

Worker is a process that runs tests in parallel. Parallel defines how tests are executed (parallel or serial). Sharding splits tests across multiple machines for faster execution in CI/CD. Projects allow running the same tests across different browsers or environments.

✔project
A project in Playwright is a configuration that allows running tests across different browsers, devices, or environments using the same test code.

✔Locators
A locator is a way to find and identify an element on a webpage so that automation tools (like Playwright or Selenium) can interact with it.
Locator = “address of an element on the webpage”
eg.
Built in element/recommended locators
await page.getByRole('role',{name: "namevalue/textValue"}), 
await page.getByText("visibleText")
await page.getByLable("labelText")
await page.getByPlaceHolder("placeHolder")  --usually used for input 
await page.getByAltText()  -- images/media have alt atrribute
await page.getByTitle("Title")
await page.getByTestId  --> not find 

Css or xpath
for css select for id we use #idName
.ClassName
tag,id,class & attribute
await page.locator("tag")
await page.locator("#idname")
await page.locator(.className)
await page.locator("tagName[attribute='value']")

if there are element matching with more than 1 then we can use
.first() OR .nth(0)    ....
locator by attribute, text
//tage[@attribute='value']
//tagName[text()='value']

fast locators /selectors 
Extension : selector hub     From googlechrome

codegen used to record script
npx command --output=tests/demo2.ts   save recording to file vs code
npx command --viewport-size"800,600" (pixcel size width & height) open browser at specific size
npx command --device="iPhone 12" (to run for specific device/emulation)

--start-maximized works only for Chromium-based browsers (Chromium, Chrome, Edge)
It does NOT work for Firefox or WebKit (Safari engine)

Plugin : playwright test for vs code

Assertions
checkpoints in script
*Most used hard assertions/auto retrying --> any assertion failed then not continue the execution
tohaveTitle() - check the page title
tohaveURL() - to ensure that page url matchs with expected one
toBeVisible()  - validating element visibility on page
toBeEnable() - element is enabled and we can perform action on it
toHaveText()  - element has text is present / exact match
toContains() - element contains specific text partial match
toHaveAttribute("attribute", attribute value) - specific element has some specific attribute
toHaveClass() element has specific css class
toHaveValue() field have expected value
toBeChecked() validate weather radio button or checkbox is checked

*soft assertion
if condition failed then also continue execution
after expect use .soft

* Text field and input box

* ways to get error
.toBeAttached();
.textContent();

* Negative assertions
use .not

.all() --> used to collect all elements
* interactive with dropdown menu
3 types
1. standard <select><option>
    - using value, using lable, using index

2. custom  > not used <select>
    - if some dropdown click and try tio inspect get disappear
    then select Console from inspect tab and type setTimeout(()=>{debugger;}, 10000)
    to pause page
3. searchable 
* handle searchable and auto suggestion drop down

* handle frames / iphrame
    - mini webpage inside page
    const countOfFrames =  page.frames(); > gt count of frames
    1) using name const leftFrame = page.frame({name:"left"});
    2) /url  const frameMiddle = page.frame({url:"/frame-includes/middle.html"});    
    3) /index onst frameRight = countOfFrames[4]; //index
            /locator const text = await frameMiddle.locator("h1").textContent();

* Handle nested frame
    _ frame inside another frame

* Handle web table
<table> - whole table
<tr> - table row
<td> - table data
<thead> - table header
<tbody> - table body


“forEach is used to iterate through an array and execute a callback function for each element.”
eg countOfFrames.forEach((frame) => {
  if (frame.url().includes("login")) {
    console.log("Login frame found");
  }
});


1. Element Handle
Radio button, CheckBox, Dropdown, 

2.Iteration over list of elements 
RegEx,contains,?. optional chaining,?? vs ||, parseInt vs parseFloat
 Login > Get list of product with its price > Assert that product have non zero price

3. Debugging by 1. vs code test exploror , 2. UI mode(--ui), 3. PWDEBUG=1,Trace Viewer

- Allure report
- Screenshots 
- Video
- Annotations
- tags 

* Playwright advance capabilities 
    - Auto waiting
    - Timeouts

   command --debug
    * Advance debugging - api level
    - set `cross-env DEBUG=pw:api ' to view api level logs --> need cross-env for windows
    - other namespaces exist too , eg  `pw:browser*, pw:channel*,pw:protocol*

* Browser Args
* Hooks 
    - can be test level or describe level
    - most common --> describe > before each > test
*global setup & teardown
    - to remove allure result before execution
* List of devices
* mobile device emulation
* tsconfig.json => custumize project settings to align with specific requirements (compile code for given settings)

* Data Handling
- Constant data /static data
- Parameterize tests for each data sets
- dynamic data /global data
- environment specific
- handling sensitive data

*Read data with csv file
*Helper function --> for DRY 
    -screenshot 
    -file helper

*Run parameterize test using csv
*Logger

* framework 
    core components
    - Modular (more abstract/reuseable fun)
    - Maintainable over the time
    - Extendable > test cases
    -  Usable (Understandable/as per coding std)
    - Reporting ()

    + POM > Base page(reusable actons) > Login page(Extends base pade & contains page ele & actions) > One/more spec file (call po to make test flow) > test suite(group of tests)

    *API
    -   request --> get,post,put,patch,delete
============================== commands ================

- no of cpu 
node -e "console.log('cpu cores:',require('os').cpus().length)"
- how many tests in current project
npx playwright test --list



================
@ WebTechTalk
logical program
String is palindrome / number is palindrom


================= Installed add ins ===============
Prettier --> make make code readable/presentable
chalk --> draw /write something in color
TODO Highlight --> to highlight syntax


=================================
points to brushUp

console.log, constructor,extends, this, super,return,abstract,getter method, setter method,async, when to use } and ), export default,why create instance,stringify,