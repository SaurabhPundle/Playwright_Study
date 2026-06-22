import { test, expect } from "@playwright/test";
import path from "path";
// npx playwright test --config=config/test.playwright.config.ts tests/demo/fileUpload.spec.ts --headed
test("single file upload", async ({ page }) => {
  await page.goto("https://testpages.eviltester.com/pages/files/file-upload/");

  await page.setInputFiles(
    "#fileinput",
    path.join(process.cwd(), "data", "uploads", "one.txt"),
  );
});
test("multiple file upload", async ({ page }) => {
  await page.goto("http://uitestingplayground.com/upload");
  const file1 = path.join(process.cwd(), "data", "uploads", "one.txt");
  const file2 = path.join(process.cwd(), "data", "uploads", "two.txt");
  const frame = page.frameLocator("iframe");
  await frame.locator("#browse").setInputFiles([file1, file2]);
  await page.waitForTimeout(3000);
});
