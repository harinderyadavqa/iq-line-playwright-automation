
import type { Locator, Page } from '@playwright/test';

export class ProfileLocators {
    readonly menuButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.menuButton = page.locator('button.btn-user-info.fr');
        this.logoutButton = page.locator('a[log-out]');
    }
}
