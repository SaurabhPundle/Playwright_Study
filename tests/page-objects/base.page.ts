import {expect,type Locator, type Page} from "@playwright/test";
import { log } from "../helpers/logger";

export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    // all reusable actions
    async navigateTo(url: string) {
        await this.page.goto(url);
        await log("Info", `Navigated to ${url}`);
    }
    // generic click method
    async click(locator: Locator){
        try{
            await expect(locator).toBeVisible({timeout:10_000});
            await locator.click();

        }
        catch(error){
            await log("Error",`Failed to click on element:${locator.toString()},Error is ${error}`);
            throw error; // rethrow to fail the test
        }

    }
    // type action
    async type(locator: Locator, text: string){
        try{
            await expect(locator).toBeVisible({timeout:10_000});
            await locator.fill(text);
            await log("Info",`Typed text "${text}" into element:${locator.toString()}`);
        }
        catch(error){
            await log("Error",`Failed to type into element:${locator.toString()},Error is ${error}`);
            throw error; // rethrow to fail the test
        }

    }
}