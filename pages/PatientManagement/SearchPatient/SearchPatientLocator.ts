
import type { Locator, Page } from '@playwright/test';

export class SearchPatientLocator {
    readonly patientId: Locator;
    readonly idSearchButton: Locator;
    readonly patientName: Locator;
    readonly nameSearchButton: Locator;
    readonly resultRows: Locator;
    readonly patientIdLinks: Locator;

    constructor(page: Page) {
        // Search by patient ID
        this.patientId = page.locator('#registrationNumber');

        this.idSearchButton = page
            .locator('form[name="searchByIdForm"]')
            .getByRole('button', {
                name: 'Search',
                exact: true,
            });

        // Search by patient name
        this.patientName = page.locator('#name');

        this.nameSearchButton = page
            .locator('form[name="searchByNameForm"]')
            .getByRole('button', {
                name: 'Search',
                exact: true,
            });

        // Search results
        this.resultRows = page.locator(
            '.registration-search-results-container table tbody tr'
        );

        this.patientIdLinks = this.resultRows.locator('td:first-child a');
    }
}
