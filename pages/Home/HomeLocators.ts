import type { Locator, Page } from '@playwright/test';

export class HomeLocators {
    readonly clinicalService: Locator;

    constructor(page: Page) {
        this.clinicalService = page.getByRole('link', {
            name: 'Clinical Service',
            exact: true,
        });
    }
}