import { test, expect } from '../fixtures/test.js';
import { LoginLocators } from '../pages/_auth/LoginLocators.js';

test('verify OpenEMR login locators', async ({ page }) => {
  const loginLocators = new LoginLocators(page);

  await page.goto('/');

  await expect(loginLocators.username).toBeVisible();
  await expect(loginLocators.password).toBeVisible();
  await expect(loginLocators.loginButton).toBeVisible();
});