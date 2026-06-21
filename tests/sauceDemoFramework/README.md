 # Sauce Demo Framework

This folder contains an advanced Playwright framework for `https://www.saucedemo.com`.

## Structure

- `data/` - test data and environment constants.
- `pages/` - page object models with reusable actions and assertions.
- `fixtures/` - custom Playwright fixtures for page objects and shared data.
- `tests/` - smoke, regression, and functional test suites.
- `playwright.config.ts` - framework-specific configuration with `baseURL`.

## Run tests

- `npm run sauce:smoke`
- `npm run sauce:regression`
- `npm run sauce:functional`
- `npm run sauce:all`
