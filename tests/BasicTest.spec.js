const {test, expect} = require('@playwright/test');
const { promises } = require('node:dns');

test('Broswer context test case', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator('input#username');
    const password = page.locator('input#password');
    const terms = page.locator('input#terms');
    const signin = page.locator('input#signInBtn');
    const pageHeader = page.locator('nav.navbar-fixed-top a.navbar-brand');
    const cardTitle = page.locator('.card-title a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await terms.click();
    await signin.click();
    await expect(pageHeader).toHaveText('ProtoCommerce Home');
    await expect(pageHeader).toContainText('ProtoCommerce');
    console.log(await cardTitle.first().textContent())
    console.log(await cardTitle.nth(1).textContent())
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles)
    
});


test('UI Controls', async ({page})=>{
    const username = page.locator('input#username');
    const password = page.locator('input#password');
    const terms = page.locator('input#terms');
    const signin = page.locator('input#signInBtn');
    const pageHeader = page.locator('nav.navbar-fixed-top a.navbar-brand');
    const cardTitle = page.locator('.card-title a');
    const dropdown = page.locator('select.form-control');
    const documentLink = page.locator('a[href*="documents-request"]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await dropdown.selectOption('consult');
    await page.locator('span.radiotextsty').last().click();
    await page.locator('button#okayBtn').click()
    console.log('User radio button status: '+await page.locator('span.radiotextsty').last().isChecked())
    await expect(page.locator('span.radiotextsty').last()).toBeChecked();
    await terms.click();
    console.log('Terms check boxs status: '+await terms.isChecked())
    await expect(terms).toBeChecked();
    await terms.uncheck();
    console.log('Terms check boxs status: '+await terms.isChecked())
    expect(await terms.isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class','blinkingText');



    // await signin.click();
    // await expect(pageHeader).toHaveText('ProtoCommerce Home');
   
    
})

test('Child window handling', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const documentLink = page.locator('a[href*="documents-request"]');
    const username = page.locator('input#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // await documentLink.click();
    const [newPage]= await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])
    const text = await newPage.locator('p.im-para.red').textContent();
    console.log(await newPage.locator('p.im-para.red').textContent());
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0]
    console.log(domain);
    await username.fill(domain);
    console.log(await username.inputValue())


})