
import type { Page } from '@playwright/test';
import { HomeLocators } from './HomeLocators.js';

export class HomePage {
    readonly page: Page;
    readonly locators: HomeLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new HomeLocators(page);
    }

    async openClinicalService(): Promise<void> {
        await this.locators.clinicalService.click();
    }
}
