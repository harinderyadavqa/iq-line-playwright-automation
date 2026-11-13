
import type { Page } from '@playwright/test';
import { ProfileLocators } from './profileLocators.js';

export class ProfilePage {
    readonly page: Page;
    readonly locators: ProfileLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new ProfileLocators(page);
    }

    async openProfileMenu(): Promise<void> {
        await this.locators.menuButton.click();
    }

    async logout(): Promise<void> {
        await this.openProfileMenu();
        await this.locators.logoutButton.waitFor({ state: 'visible' });
        await this.locators.logoutButton.click();
    }
}
