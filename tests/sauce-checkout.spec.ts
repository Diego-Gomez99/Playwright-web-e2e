import {test, expect} from '@playwright/test';

test.describe('SauceDemo E2E Checkout Flow with Network Interception', () => {

    test('should complete the checkout flow successfully with mocked payment response', async ({ page }) => {

        // Step 1. Navigate to the SauceDemo website and perform login
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Step 2. Validate that the user is logged in by checking the presence of the products page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        // Step 3. Add items to the cart
        await page.click('#add-to-cart-sauce-labs-backpack');
        await page.click('#add-to-cart-sauce-labs-bike-light');

        // Step 4. Navigate to the cart and proceed to checkout
        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(2);
        await page.click('#checkout');

        // Step 5. Fill in the checkout information
        await page.fill('#first-name', 'Diego');
        await page.fill('#last-name', 'Gomez');
        await page.fill('#postal-code', '12345');
        await page.click('#continue');

        // Step 6. Intercept the network request to the payment gateway and mock the response
        await page.route('**/api/register', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    id: 999,
                    token: "mocked_payment_success_token_xyz",
                    message: "Payment successful!"
                })
            });
        }); 
        
        // step 7. Finish the checkout process
         await page.click('#finish');

        // Step 8. Validate the order confirmation page
        const successHEader = page.locator('.complete-header');
        await expect(successHEader).toHaveText('Thank you for your order!');
    });

});