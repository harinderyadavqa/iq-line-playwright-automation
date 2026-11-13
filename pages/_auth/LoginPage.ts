
import type { Page } from '@playwright/test';
import { LoginLocators } from './LoginLocators.js';
import { ProfilePage } from '../component/HeaderMenu/Profile/ProfilePage.js';

export class LoginPage {
    readonly page: Page;
    readonly locators: LoginLocators;
    readonly profilePage: ProfilePage;

    constructor(page: Page) {
        this.page = page;
        this.locators = new LoginLocators(page);
        this.profilePage = new ProfilePage(page);
    }

    async login(username: string, password: string): Promise<void> {
        await this.locators.username.fill(username);
        await this.locators.password.fill(password);
        await this.locators.loginButton.click();

        await this.locators.location.waitFor({ state: 'visible' });
        await this.locators.location.selectOption({ label: 'Emergency' });
        await this.locators.continueButton.click();
    }

    async logout(): Promise<void> {
        await this.profilePage.logout();
    }
}
