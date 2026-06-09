// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',

  timeout: 60000,
  expect: {
    timeout: 50 * 1000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on'//retain-on-failure
      }
    }
  ],

});
module.exports = config;
