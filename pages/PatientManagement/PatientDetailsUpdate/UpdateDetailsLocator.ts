
import type { Locator, Page } from '@playwright/test';

export class UpdateDetailsLocator {
    readonly ageYears: Locator;
    readonly saveButton: Locator;
    readonly patientIdentifier: Locator;

    constructor(page: Page) {
        this.ageYears = page.locator('#ageYears');

        this.saveButton = page.locator(
            'button.right.submit-btn'
        );

        this.patientIdentifier = page.locator(
            'text=Patient Identifier:'
        );
    }
}
