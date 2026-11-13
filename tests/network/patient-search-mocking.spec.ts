
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/Home/HomePage.js';
import { LoginPage } from '../../pages/_auth/LoginPage.js';
import { env } from '../../config/env.js';

const SEARCH_URL = '**/openmrs/ws/rest/v1/bahmni/search/patient**';
const SEARCH_PATH = '/openmrs/ws/rest/v1/bahmni/search/patient?q=MOCK123';

const mockPatientResponse = {
    totalCount: 1,
    pageOfResults: [
        {
            uuid: 'mock-patient-uuid',
            identifier: 'MOCK123',
            givenName: 'Mock',
            familyName: 'Patient',
            gender: 'M',
            age: '25',
        },
    ],
};

async function loginToBahmni(page: import('@playwright/test').Page) {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await homePage.openClinicalService();
    await loginPage.login(env.username, env.password);
}

test.describe('Patient Search Network Mocking', () => {

    test.beforeEach(async ({ page }) => {
        await loginToBahmni(page);
    });

    test('should handle successful API response', async ({ page }) => {
        await page.route(SEARCH_URL, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockPatientResponse),
            });
        });

        const response = await page.evaluate(async (path) => {
            const result = await fetch(path, { credentials: 'include' });
            return {
                status: result.status,
                body: await result.json(),
            };
        }, SEARCH_PATH);

        expect(response.status).toBe(200);
        expect(response.body.pageOfResults[0].identifier).toBe('MOCK123');
    });

    test('should handle server error 500', async ({ page }) => {
        await page.route(SEARCH_URL, async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'Internal Server Error',
                }),
            });
        });

        const response = await page.evaluate(async (path) => {
            const result = await fetch(path, { credentials: 'include' });
            return {
                status: result.status,
                body: await result.json(),
            };
        }, SEARCH_PATH);

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal Server Error');
    });

    test('should handle delayed API response', async ({ page }) => {
        await page.route(SEARCH_URL, async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockPatientResponse),
            });
        });

        const startTime = Date.now();

        const response = await page.evaluate(async (path) => {
            const result = await fetch(path, { credentials: 'include' });
            return {
                status: result.status,
                body: await result.json(),
            };
        }, SEARCH_PATH);

        const responseTime = Date.now() - startTime;

        expect(response.status).toBe(200);
        expect(responseTime).toBeGreaterThanOrEqual(3000);
        expect(response.body.pageOfResults[0].identifier).toBe('MOCK123');
    });
});
