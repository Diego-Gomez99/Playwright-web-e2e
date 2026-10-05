import {test, expect} from '@playwright/test';
import {z} from 'zod';

// Define the schema for the API response
const UserContractSchema = z.object({
    data: z.object({
        id: z.number(),
        email: z.string().email(),
        first_name: z.string(),
        last_name: z.string(),
        avatar: z.string().url(),
    }),
    support: z.object({
        url: z.string().url(),
        text: z.string(),
    }),
});

test.describe('Advanced API & Networking Mock Tests Suite', () => {

    test('Contract Validation: Verify JSON schema compliance using Zod', async ({ request }) => {
        // 1. Send a GET request to fetch user profile
        const response = await request.get('https://reqres.in/api/users/2');
        expect(response.status()).toBe(200);

        const body = await response.json();

        // 2. Validate the response against the Zod schema
        const parseDate = UserContractSchema.safeParse(body);
        expect(parseDate.success).toBe(true);
    }); 

    test('Network Interception: Mock API 500 Error Response', async ({ page }) => {
        // 1. Intercept the API request and mock a 500 error response
        await page.route('https://reqres.in/api/users/2', route => {
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Internal Server Error (Simulated)' }),
            });
        });

        // Make the request to verify the mocked response
        const response = await page.evaluate(async () => {
            const res = await fetch('https://reqres.in/api/users/2');
            return {
                status: res.status,
                body: await res.json(),
            };
        });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error (Simulated)' });
    });

});