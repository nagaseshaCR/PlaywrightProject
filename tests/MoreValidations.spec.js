const {test, expect} = require('@playwright/test')
// test.describe.configure({mode:'parallel'})
// test.describe.configure({mode:'serial'})
test('@web More validations', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();

    page.on('dialog', dialog => dialog.accept())
    await page.locator('input#confirmbtn').click();
    await page.locator('button#mousehover').hover();

    const framePage = page.frameLocator('iframe#courses-iframe');
    await framePage.locator('li a[href="lifetime-access"]:visible').click();
    console.log("Happy Subscribers: "+await framePage.locator('h2[style*="padding-bottom"] span').textContent());
})

test('Screenshot & Visual testing validations', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await page.locator('#hide-textbox').screenshot({path: 'partialScreenshot.png'})
    page.screenshot({path: 'Screenshot.png'});
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();
})

test('Visual testing', async({page})=>{
    await page.goto('https://flightware.com/')
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})