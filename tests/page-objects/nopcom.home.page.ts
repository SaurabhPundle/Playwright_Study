import{ expect } from "@playwright/test";
import BasePage from "./base.page";
import { log } from "../helpers/logger";
export default class HomePage extends BasePage {
  // Constructor
  constructor(page) {
    super(page);
  }

  // element
  get userNameInputBox() {
    return this.page.getByRole("textbox", { name: "Email:" });
  }

  get passwordInputBox() {
    return this.page.getByRole("textbox", { name: "Password:" });
  }
  get loginButton() {
    return this.page.getByRole("button", { name: "Log in" });
  }
  // action
  async loginToNopcom(url: string, email: string, password: string) {
    this.navigateTo(url);
    await this.type(this.userNameInputBox, email);
    await this.type(this.passwordInputBox, password);
    await this.click(this.loginButton);
    // assert url
    await expect(this.page).toHaveURL(`${url}/admin/`);
        await log("Info", `Successfully logged in to nopcommerce admin with email: ${email}`);
  }
}
