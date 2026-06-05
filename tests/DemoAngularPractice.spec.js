const {test, expect} = require('@playwright/test')

test('@web Demo angular practice test', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByPlaceholder('password').fill('Test123@')
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByRole('button', {name: 'Submit'}).click();
    expect(await page.getByText('Success! The Form has been submitted successfully!.').isVisible()).toBeTruthy();
    await page.getByRole('link', {name: 'Shop'}).click();
    await page.locator('app-card').filter({'hasText':'Nokia Edge'}).getByRole('button').click();

})