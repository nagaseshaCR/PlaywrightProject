// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  retries:1,
  workers: 5,
  timeout: 60000,
  expect: {
    timeout: 50 * 1000,
  },
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on'//retain-on-failure
        //...devices['iPhone 15']
      }

    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions:['geolocation']
        // viewport: { width: 720, height: 720 }

      }
    }
  ],
  reporter: 'html',


});
module.exports = config;
