
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

        // Step 3: Search patient using patient ID
        await searchPatientPage.searchByPatientId(patientId);

        // Step 4: Verify patient appears in search results
        await searchPatientPage.verifyPatientInResults(patientId);

        // Step 5: Open patient record by clicking the ID
        await searchPatientPage.openPatientRecord(patientId);

        // Step 6: Verify patient record is displayed
        await expect(page).toHaveURL(/#\/patient\//);
        await expect(
            page.getByText('Patient Identifier:', { exact: false })
        ).toBeVisible();
    });
});
