const {test, expect} = require('@playwright/test');
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, `../.env.${process.env.TEST_ENV || 'dev'}`),
    override: true
});


test('Text Env client app login', async ({page})=>{

    const loginPageTitle = page.locator('h1.login-title');
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginButton = page.locator('#login');
    await page.goto(process.env.BASE_URL);
    await expect(loginPageTitle).toHaveText('Log in');
    console.log('Base URL is: ' + process.env.BASE_URL);
    console.log('Username is: ' + process.env.USERNAME);
    console.log('Password is: ' + process.env.PASSWORD);
    await username.fill(process.env.USERNAME);
    await password.fill(process.env.PASSWORD);
    await loginButton.click();
    // await expect(page.locator('div.left.mt-1 h3')).toHaveText('Automation'); // page header     
})