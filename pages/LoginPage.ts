import {Page, Locator, expect} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly titleSpan: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.titleSpan = page.locator('.title');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    //Step 1: Navigate to the login page
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    //Step 2: Fill in the username and password fields and click the login button
    async fillCredentials(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}