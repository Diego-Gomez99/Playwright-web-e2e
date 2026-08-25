import {test, expect} from '@playwright/test';

test('Get the users list fromthe API and validate the response', async ({request}) => {
    // Send a GET request to the API endpoint
    const response = await request.get('https://reqres.in/api/users?page=2');

    // Validate the response status code
    expect(response.status()).toBe(200);

    // Validate the response body
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('page', 2);
    expect(responseBody.data.length).toBeGreaterThan(0);
});