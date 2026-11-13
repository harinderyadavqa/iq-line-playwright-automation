import { test as base, expect } from '@playwright/test';
import { logger as appLogger } from '../utils/logger.js';

export {expect};

export const test = base.extend<{logger: typeof appLogger}>({
    logger: async ({}, use) => {
        await use(appLogger)
    }
});
