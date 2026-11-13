
import type { Locator, Page } from '@playwright/test';

export class LoginLocators {
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly logoutButton: Locator;
    readonly location: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.loginButton = page.getByRole('button', {
            name: 'Login',
            exact: true,
        });
        this.logoutButton = page.getByRole('link', {
            name: 'Logout',
            exact: true,
        });

        this.location =  page.locator('#location');

        this.continueButton = page.getByRole('button', {
            name: 'Continue',
            exact: true,
        });
    }
}
