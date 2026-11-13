
import { test, expect } from '../../fixtures/test.js';
import { HomePage } from '../../pages/Home/HomePage.js';
import { LoginPage } from '../../pages/_auth/LoginPage.js';
import { SearchPatientPage } from '../../pages/PatientManagement/SearchPatient/SearchPatientPage.js';
import { UpdateDetailsPage } from '../../pages/PatientManagement/PatientDetailsUpdate/UpdateDetailsPage.js';
import { env } from '../../config/env.js';

test.describe('Bahmni Patient Update', () => {
    test('should update patient age successfully', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const searchPatientPage = new SearchPatientPage(page);
        const updateDetailsPage = new UpdateDetailsPage(page);

        const patientId = 'ABC6252539';
        const updatedAge = '21';

        // Step 1: Login
        await page.goto('/');
        await homePage.openClinicalService();
        await loginPage.login(env.username, env.password);

        // Step 2: Open Patient Registration
        await page.locator('#bahmni\\.registration').click();

        // Step 3: Search for patient by ID
        await searchPatientPage.searchByPatientId(patientId);

        // Step 4: Wait for patient details page
        await expect(page).toHaveURL(/#\/patient\//);

        // Step 5: Verify patient identifier
        await expect(
            page.getByText(patientId, { exact: true })
        ).toBeVisible();

        // Step 6: Update patient age
        await updateDetailsPage.updatePatientAge(updatedAge);

        // Step 7: Verify age before saving
        await expect(
            updateDetailsPage.locators.ageYears
        ).toHaveValue(updatedAge);

        // Step 8: Save patient details
        await updateDetailsPage.savePatientDetails();

        // Step 9: Verify age after saving
        await expect(
            updateDetailsPage.locators.ageYears
        ).toHaveValue(updatedAge);
    });
});
