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
        await loginPage.verifyLoginSuccess();
    });

    test('Login with invalid credentials', async () => {
        const expectedError = 'Epic sadface: Username and password do not match any user in this service';
        await loginPage.fillCredentials('invalid_user', 'invalid_password');
        await loginPage.verifyLoginFailure(expectedError);
    });

    // Simulate a blocker user or a netwotrk issue scenario
    test('Login with perfomance glitch user and track response', async () => {
        // Monitor answer time for the login request
        const startTime = Date.now();

        await loginPage.fillCredentials('performance_glitch_user', 'secret_sauce');
        await loginPage.verifyLoginSuccess();

        const duration = Date.now() - startTime;
        console.log(`Login request duration: ${duration} ms`);

        // Performance threshold check (example: 10000 ms)
        expect(duration).toBeLessThan(10000);
    });

});
