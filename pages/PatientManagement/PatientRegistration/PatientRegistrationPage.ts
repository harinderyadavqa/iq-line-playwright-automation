
import type { Page } from '@playwright/test';
import { PatientRegistrationLocator } from './PatientRegistrationLocator.js';

export class PatientRegistrationPage {
    readonly page: Page;
    readonly locators: PatientRegistrationLocator;

    constructor(page: Page) {
        this.page = page;
        this.locators = new PatientRegistrationLocator(page);
    }

    async openRegistrationForm(): Promise<void> {
        await this.locators.createNew.click();
    }

    async enterPatientDetails(
        firstName: string,
        lastName: string,
        gender: string,
        age: number
    ): Promise<void> {
        await this.locators.firstName.fill(firstName);
        await this.locators.lastName.fill(lastName);
        await this.locators.gender.selectOption({ label: gender });
        await this.locators.ageYears.fill(String(age));
    }

    async savePatient(): Promise<void> {
    await this.locators.saveButton.click();
    }

    async verifyPatientSaved(): Promise<void> {
    await this.locators.successMessage.waitFor({
        state: 'visible',
    });

    await this.locators.patientIdentifier.waitFor({
        state: 'visible',
    });
}
}
