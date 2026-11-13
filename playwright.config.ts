
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load project environment variables before importing env configuration.
dotenv.config({
    override: true,
});

import { env } from './config/env.js';

export default defineConfig({
    testDir: './tests',

    // Run independent tests in parallel.
    fullyParallel: true,

    // Prevent accidental test.only in CI.
    forbidOnly: !!process.env.CI,

    // Retry failed tests in CI.
    retries: process.env.CI ? 2 : 0,

    // Worker configuration.
    workers: process.env.CI ? 1 : 4,

    // HTML test report.
    reporter: 'html',

    // Shared browser settings.
    use: {
        baseURL: env.baseUrl,

        // Capture screenshots on failure.
        screenshot: 'only-on-failure',

        // Retain video when a test fails.
        video: 'retain-on-failure',

        // Retain traces for failed tests.
        trace: 'retain-on-failure',
    },

    // Browser projects.
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
