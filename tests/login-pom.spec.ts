import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Login with valid credentials', async () => {
        await loginPage.fillCredentials('standard_user', 'secret_sauce');
        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(loginPage.titleSpan).toHaveText('Products');
    });

    test('Login with invalid credentials', async () => {
        await loginPage.fillCredentials('invalid_user', 'invalid_password');
        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
});

