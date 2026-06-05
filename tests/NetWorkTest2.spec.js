const { test, expect } = require('@playwright/test');

test('Security test request intercept', async ({ page }) => {

    const username = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const loginButton = page.locator('#login')
    await page.goto('https://rahulshettyacademy.com/client')
        await username.fill('seshu99@gmail.com');
        await password.fill('Seshu24@');
        await loginButton.click();
        await page.locator('button[routerlink*="myorders"]').click();
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6s10589717se3e78bs918d8s' }))
    await page.locator('button:has-text("View")').first().waitFor()
    await page.locator('button:has-text("View")').first().click();
    console.log("Error Message: "+await page.locator('p.blink_me').textContent())
    await expect(await page.locator('p.blink_me')).toHaveText('You are not authorize to view this order')
})



test('Browser contect Playwright test', async function({browser}){
    //chrome - plugin / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    page.route('**/*.{css,jpg,png,jpeg}', route => route.abort());
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('#terms').check();   
    await page.locator('#signInBtn').click();
    console.log(await page.title())
   
});
