
import { test, expect } from '../../fixtures/test.js';
import { HomePage } from '../../pages/Home/HomePage.js';
import { LoginPage } from '../../pages/_auth/LoginPage.js';
import { env } from '../../config/env.js';

test('should logout successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await homePage.openClinicalService();
    await loginPage.login(env.username, env.password);

    await expect(page).toHaveURL(/#\/dashboard/);

    await loginPage.logout();

    await expect(loginPage.locators.username).toBeVisible();
});
