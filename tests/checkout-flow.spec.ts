import {test, expect} from '@playwright/test';

test.describe('E-commerce Checkout Flow & Payment Flow', () => {

    test('should complete the checkout flow successfully', async ({ request, page }) => {

        // Step 1. Navigate to the e-commerce website and obtain the authentication token
        const loginResponse = await page.request.post('https://reqres.in/api/login', {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        }); 

        expect(loginResponse.status()).toBe(200);
        const loginData = await loginResponse.json();
        const authToken = loginData.token;
        expect(authToken).toBeTruthy();

        //Step 2. Simulate the external payment gateway response
        await page.route('**/api/register', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ 
                    id:999, 
                    token:"mocked_payment_success_token_xyz",
                    message:"Payment successful!" 
                })
            });
        });

        // Step 3. Trigger the checkout API request from the browser context to hit the mock interceptor
        const checkoutResponse = await page.evaluate(async (authToken) => {
            const response = await fetch('https://reqres.in/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    email: 'eve.holt@reqres.in',
                    amount: 100.00,
                    items: ['item1', 'item2']
                })
            });
            return {
                status: response.status,
                data: await response.json()
            };
        }, authToken);

        // Step 4. Validate the checkout response
        expect(checkoutResponse.status).toBe(200);
        const orderData = await checkoutResponse.data;

        // Verify that the order data contains the expected fields
        expect(orderData.token).toBe('mocked_payment_success_token_xyz');
        expect(orderData.id).toBe(999);
        expect(orderData.message).toBe('Payment successful!');
    });
});
