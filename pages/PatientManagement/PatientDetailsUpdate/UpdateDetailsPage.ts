
import type { Page } from '@playwright/test';
import { UpdateDetailsLocator } from './UpdateDetailsLocator.js';

export class UpdateDetailsPage {
    readonly page: Page;
    readonly locators: UpdateDetailsLocator;

    constructor(page: Page) {
        this.page = page;
        this.locators = new UpdateDetailsLocator(page);
    }

    async updatePatientAge(age: string): Promise<void> {
        await this.locators.ageYears.waitFor({
            state: 'visible',
        });

        await this.locators.ageYears.fill(age);
    }

    async savePatientDetails(): Promise<void> {
        await this.locators.saveButton.click();
    }
}
