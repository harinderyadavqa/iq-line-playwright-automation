
import { test, expect } from '../../fixtures/test.js';
import { HomePage } from '../../pages/Home/HomePage.js';
import { LoginPage } from '../../pages/_auth/LoginPage.js';
import { env } from '../../config/env.js';

test.describe('Bahmni Authentication', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await page.goto('/');
        await homePage.openClinicalService();

        await expect(page).toHaveURL(/login/);

        await loginPage.login(env.username, env.password);

    });

    test('should successfully login to Bahmni', async ({ page }) => {
        await expect(page).not.toHaveURL(/loginLocation/);
        await expect(page).not.toHaveURL(/login$/);
        await expect(page).toHaveURL(/dashboard/);

        await expect(
            page.getByText('Registration', { exact: true })
        ).toBeVisible();
    });

    test.afterEach(async () => {
        if (await loginPage.locators.logoutButton.isVisible()) {
            await loginPage.logout();
        }
    });
});
