const {test, expect} = require('@playwright/test');

test('@web Browser contect Playwright test', async function({browser}){
    //chrome - plugin / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('rahulshettyacademy123');
    await page.locator('#password').fill('learning');
    await page.locator('#terms').check();   
    await page.locator('#signInBtn').click();
    // console.log(await page.locator('div[style*="block"]').textContent());
    // await expect(page.locator("[style*='block']")).toContainText('incorrect');

    const errorMsg = page.locator('.alert-danger');
  await expect(errorMsg).toContainText('Incorrect username/password.');
});

//     test('Page Playwright test', async function({page}){
    
//     await page.goto('https://google.com');
//     console.log(await page.title());
//     await expect(page).toHaveTitle('Google');
// });