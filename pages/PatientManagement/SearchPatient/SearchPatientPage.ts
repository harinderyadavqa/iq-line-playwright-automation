
import type { Page, Locator } from '@playwright/test';
import { SearchPatientLocator } from './SearchPatientLocator.js';

export class SearchPatientPage {
    readonly page: Page;
    readonly locators: SearchPatientLocator;

    constructor(page: Page) {
        this.page = page;
        this.locators = new SearchPatientLocator(page);
    }

    async searchByPatientId(patientId: string): Promise<void> {
        await this.locators.patientId.fill(patientId);
        await this.locators.idSearchButton.click();
    }

    async searchByName(name: string): Promise<void> {
        await this.locators.patientName.fill(name);
        await this.locators.nameSearchButton.click();
    }

    getPatientRow(fullName: string): Locator {
        return this.locators.resultRows.filter({
            hasText: fullName,
        });
    }

    getPatientIdLink(patientId: string): Locator {
        return this.locators.patientIdLinks.filter({
            hasText: patientId,
        });
    }

    async verifyPatientInResults(patientId: string): Promise<void> {
        await this.getPatientIdLink(patientId).waitFor({
            state: 'visible',
            timeout: 15000,
        });
    }

    async openPatientRecord(patientId: string): Promise<void> {
        // If Bahmni has already opened the patient record, do not click again.
        if (/\/#\/patient\//.test(this.page.url())) {
            return;
        }

        await this.getPatientIdLink(patientId).waitFor({
            state: 'visible',
            timeout: 15000,
        });

        await this.getPatientIdLink(patientId).click();

        await this.page.waitForURL(/#\/patient\//, {
            timeout: 15000,
        });
    }
}
