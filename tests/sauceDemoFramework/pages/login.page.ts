import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private get usernameField() {
    return this.page.locator('#user-name');
  }

  private get passwordField() {
    return this.page.locator('#password');
  }

  private get loginButton() {
    return this.page.locator('#login-button');
  }

  async goto() {
    await this.navigate('/');
  }

  async assertLoginPageVisible() {
    await expect(this.usernameField, 'Username field should be visible on login page').toBeVisible({ timeout: 10000 });
    await expect(this.passwordField, 'Password field should be visible on login page').toBeVisible({ timeout: 10000 });
    await expect(this.loginButton, 'Login button should be visible on login page').toBeVisible({ timeout: 10000 });
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameField, username, 'username field');
    await this.fill(this.passwordField, password, 'password field');
    await this.click(this.loginButton, 'login button');
  }
}
