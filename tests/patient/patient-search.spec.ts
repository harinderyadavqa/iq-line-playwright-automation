
import { test, expect } from '../../fixtures/test.js';
import { HomePage } from '../../pages/Home/HomePage.js';
import { LoginPage } from '../../pages/_auth/LoginPage.js';
import { SearchPatientPage } from '../../pages/PatientManagement/SearchPatient/SearchPatientPage.js';
import { env } from '../../config/env.js';

test.describe('Bahmni Patient Search', () => {
    test('should search for a patient and open the patient record', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const searchPatientPage = new SearchPatientPage(page);

        const patientId = 'ABC6252539';

        // Step 1: Login
        await page.goto('/');
        await homePage.openClinicalService();
        await loginPage.login(env.username, env.password);

        // Step 2: Open Patient Registration
        await page.locator('#bahmni\\.registration').click();

        // Step 3: Search patient using patient ID.
        // Bahmni navigates directly to the patient record.
        await searchPatientPage.searchByPatientId(patientId);

        // Step 4: Verify direct navigation to patient record
        await expect(page).toHaveURL(/#\/patient\/[^/?#]+/);

        // Step 5: Verify patient identifier on the record
        await expect(
            page.getByText('Patient Identifier:', { exact: false })
        ).toBeVisible();

        await expect(
            page.getByText(patientId, { exact: true })
        ).toBeVisible();
    });
});
