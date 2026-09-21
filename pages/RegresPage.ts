import {APIRequestContext, expect} from '@playwright/test';

export class RegresPage {
    readonly request: APIRequestContext;
    readonly baseUrl: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = 'https://reqres.in/api';
    }

    // Action: Authenticate and return dynamic token
    async login(email: string, password: string): Promise<string> {
        const response = await this.request.post(`${this.baseUrl}/login`, {
            data: { email, password },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('token');
        return body.token;
    }

    // Action: Fetch user profile using token
    async getUserProfile(userId: number, token: string){
        const response = await this.request.get(`${this.baseUrl}/users/${userId}`);
        expect(response.status()).toBe(200);
        return response.json();
    }
}
    