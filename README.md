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

    * Advance debugging - api level
    - set `cross-env DEBUG=pw:api ' to view api level logs --> need cross-env for windows
    - other namespaces exist too , eg  `pw:browser*, pw:channel*,pw:protocol*

* Browser Args
* Hooks 
    - can be test level or describe level
    - most common --> describe > before each > test
*global setup & teardown
    - to remove aallure result before execution
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
*Helper function
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

============================== commands ================

- no of cpu 
node -e "console.log('cpu cores:',require('os').cpus().length)"
- how many tests in current project
npx playwright test --list


================= Installed add ins ===============
Prettier --> make make code readable/presentable
chalk --> draw /write something in color


=================================
points to brushUp

console.log, constructor,extends, this, super,return,abstract,getter method, setter method,async, when to use } and ), export default,why create instance,