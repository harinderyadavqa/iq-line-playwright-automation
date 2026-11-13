
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/Home/HomePage.js';
import { LoginPage } from '../../pages/_auth/LoginPage.js';
import { ApiClient } from '../../api/clients/ApiClient.js';
import {
    API_ENDPOINTS,
    patientSearchParams,
} from '../../api/endpoints/ApiEndpoints.js';
import { env } from '../../config/env.js';

test.describe('Bahmni Patient Search API', () => {
    let apiClient: ApiClient;

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await page.goto('/');
        await homePage.openClinicalService();
        await loginPage.login(env.username, env.password);

        apiClient = new ApiClient(page.request);
    });

    test('should return successful patient search response', async () => {
        const response = await apiClient.get(
            API_ENDPOINTS.PATIENT_SEARCH,
            patientSearchParams('ABC6252539')
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('totalCount');
        expect(body).toHaveProperty('pageOfResults');
        expect(typeof body.totalCount).toBe('number');
        expect(Array.isArray(body.pageOfResults)).toBe(true);
    });

    test('should search patients by name', async () => {
        const response = await apiClient.get(
            API_ENDPOINTS.PATIENT_SEARCH,
            patientSearchParams('TestBHJEFEFAFEIAJ')
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.pageOfResults.length).toBeGreaterThan(0);
        expect(body.pageOfResults[0].givenName).toContain('Test');
    });

    test('should validate response structure and response time', async () => {
        const startTime = Date.now();

        const response = await apiClient.get(
            API_ENDPOINTS.PATIENT_SEARCH,
            patientSearchParams('TestBHJEFEFAFEIAJ')
        );

        const responseTime = Date.now() - startTime;

        expect(response.status()).toBe(200);
        expect(responseTime).toBeLessThan(5000);

        const body = await response.json();

        expect(typeof body.totalCount).toBe('number');
        expect(Array.isArray(body.pageOfResults)).toBe(true);

        if (body.pageOfResults.length > 0) {
            expect(body.pageOfResults[0]).toEqual(
                expect.objectContaining({
                    uuid: expect.any(String),
                    identifier: expect.any(String),
                    givenName: expect.any(String),
                    familyName: expect.any(String),
                    gender: expect.any(String),
                    age: expect.any(String),
                })
            );
        }
    });
});
