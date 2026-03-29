import { test, expect } from '@playwright/test';

test('nopcom', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
// assert url
  await expect(page).toHaveURL('https://admin-demo.nopcommerce.com/admin/');
});