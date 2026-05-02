import {Page} from '@playwright/test';
import {basePage} from './basePage'; // 1st basePage is class name and 2nd is file name

export class loginPage extends basePage{
    constructor(page:Page){
        super(page);  // child class has contructor, it should pass parent class constructor

    }
    private usernameField = "#user-name"; // only this class can used
    private passwordField = "#password";
    private loginButton = "#login-button";

    async loginTo(username:string,password:string){
        await this.page.fill(this.usernameField,username);
        await this.page.fill(this.passwordField,password);
        await this.page.click(this.loginButton);
    }
}

