import { test, expect } from '../../fixtures/test.js';
import { HomePage } from '../../pages/Home/HomePage.js';
import { LoginPage } from '../../pages/_auth/LoginPage.js';
import { PatientRegistrationPage } from '../../pages/PatientManagement/PatientRegistration/PatientRegistrationPage.js'; 
import { env } from '../../config/env.js';
import { generatePatientData } from '../../testdata/testDataFactory.js';

test('should register a new patient successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registrationPage = new PatientRegistrationPage(page);
    const patient = generatePatientData();

    await page.goto('/');
    await homePage.openClinicalService();
    await loginPage.login(env.username, env.password);

    await page.locator('#bahmni\\.registration').click();
    await registrationPage.openRegistrationForm();

    await registrationPage.enterPatientDetails(
        patient.firstName,
        patient.lastName,
        'Male',
        20
    );

    await registrationPage.savePatient();

    await expect(registrationPage.locators.successMessage).toBeVisible();
    await expect(registrationPage.locators.patientIdentifier).toBeVisible();
});