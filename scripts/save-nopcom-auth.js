const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const profileDir = path.resolve(process.cwd(), 'auth-nopcom-profile');
  if (!fs.existsSync(profileDir)) {
    fs.mkdirSync(profileDir, { recursive: true });
  }
  const authFile = path.resolve(process.cwd(), 'auth-nopcom.json');
  const url = process.argv[2] || 'https://admin-demo.nopcommerce.com';
  const context = await chromium.launchPersistentContext(profileDir, {
    headless: false,
    viewport: null,
    args: [
      '--start-maximized',
      '--disable-blink-features=AutomationControlled',
    ],
  });
  const page = await context.newPage();
  console.log(`Open browser. Please complete Cloudflare checks and log in at: ${url}`);
  await page.goto(url);
  console.log('When you have completed verification and logged in, press Enter in this terminal to save storage state.');
  process.stdin.once('data', async () => {
    await context.storageState({ path: authFile });
    console.log('Saved auth state to', authFile);
    console.log('Persistent browser profile directory:', profileDir);
    await context.close();
    process.exit(0);
  });
})();
