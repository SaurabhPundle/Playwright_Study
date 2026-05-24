import { test, expect } from '@playwright/test';
import {createUser} from '../../factories/user.factory'

test('test', async ({ page }) => {
    const user = createUser(); // create object of creat
  await page.goto('https://automationexercise.com/signup');
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill(user.name);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(user.email);
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.getByRole('textbox', { name: 'Name *', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill(user.password);
  await page.locator('#days').selectOption(user.day);
  await page.locator('#months').selectOption(user.month);
  await page.locator('#years').selectOption(user.year);
  await page.getByRole('textbox', { name: 'First name *' }).fill(user.fullName);
  await page.getByRole('textbox', { name: 'Last name *' }).fill(user.lastName);
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill(user.company);
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(user.address1);
  await page.getByRole('textbox', { name: 'Address 2' }).click();
  await page.getByRole('textbox', { name: 'Address 2' }).fill(user.address2);
  await page.getByRole('textbox', { name: 'State *' }).click();
  await page.getByRole('textbox', { name: 'State *' }).fill(user.state);
  await page.locator("#city").fill(user.city);
 await page.locator("#zipcode").fill(user.zipcode);
  await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill(user.mobilenumber);
  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByText('Account Created!')).toBeVisible();
});
