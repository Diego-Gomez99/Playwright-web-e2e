import{test,expect} from '@playwright/test';
import {RegresPage} from '../pages/RegresPage';

test.describe('Regres API Tests', () => {
    let regresPage: RegresPage;
    
test.beforeEach(async ({ request }) => {
        regresPage = new RegresPage(request);
    });

    test('Login and fetch user profile', async () => {
        // 1 Login and extract dynamic authentication token
        const token = await regresPage.login('eve.holt@reqres.in', 'cityslicka');
        expect(token).toBeTruthy();

        // 2 Fetch user profile using the dynamic token
        const profileData = await regresPage.getUserProfile(2, token);

        // 3 Assertions on profile payload
        expect(profileData.data.id).toBe(2);
        expect(profileData.data.email).toBe('janet.weaver@reqres.in');
    });
});