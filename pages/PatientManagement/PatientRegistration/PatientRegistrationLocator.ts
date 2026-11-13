
import type { Locator, Page } from '@playwright/test';

export class PatientRegistrationLocator {
    readonly createNew: Locator;
    readonly firstName: Locator;
    readonly middleName: Locator;
    readonly lastName: Locator;
    readonly gender: Locator;
    readonly ageYears: Locator;
    readonly ageMonths: Locator;
    readonly ageDays: Locator;
    readonly saveButton: Locator;
    readonly successMessage: Locator;
    readonly patientIdentifier: Locator;

    constructor(page: Page) {
        this.createNew = page.getByText('Create New', { exact: true });
        this.firstName = page.locator('#givenName');
        this.middleName = page.getByPlaceholder('Middle Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.gender = page.locator('#gender');
        this.ageYears = page.locator('#ageYears');
        this.ageMonths = page.locator('#ageMonths');
        this.ageDays = page.locator('#ageDays');
        this.saveButton = page.getByRole('button', {
            name: 'Save',
            exact: true,
        });
        this.successMessage = page.locator('#view-content').getByText('Saved', {
            exact: true,
        });

        this.patientIdentifier = page.locator('text=Patient Identifier')
            .locator('..');
        }
}
