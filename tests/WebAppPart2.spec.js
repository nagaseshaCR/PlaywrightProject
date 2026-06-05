const {test, expect, request} = require('@playwright/test')

let webContext;
test.beforeAll(async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPageTitle = page.locator('h1.login-title')
    const username = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const loginButton = page.locator('#login')
    await page.goto('https://rahulshettyacademy.com/client')
    await username.fill('seshu99@gmail.com');
    await password.fill('Seshu24@');
    await loginButton.click();
    await page.waitForLoadState('networkidle')
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});

})

test('@API Client app practice', async ()=>{

    
    const page = await webContext.newPage();    
    const homePageTitle = page.locator('div.left.mt-1 h3')
    const products = page.locator('div.card-body')
    const shoppingCart = page.locator('[routerlink*="cart"]');
    const cartItemsList = page.locator('div.infoWrap');


    await page.goto('https://rahulshettyacademy.com/client')
    await expect(homePageTitle).toHaveText('Automation'); // page header
    await page.waitForLoadState('networkidle'); // wait for page load
    await products.last().waitFor(); // wait for single element from the list

    const countItems = await products.count();
    console.log(countItems)
    for(let i=0; i < countItems; i++){
        if(await products.nth(i).locator('b').textContent()==='ZARA COAT 3'){
            console.log("Product Name: "+await products.nth(i).locator('b').textContent());
            console.log("Product Price: "+await products.nth(i).locator('.text-muted').textContent());
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    
    // await page.waitForLoadState('networkidle');
    await shoppingCart.click();
    await cartItemsList.last().waitFor();

    console.log("Cart Item Name: "+await page.locator('h3:has-text("ZARA COAT 3")').textContent())
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    expect(bool).toBeTruthy();
    for(let i =0; i < await cartItemsList.count(); i++){
        if(await cartItemsList.nth(i).locator('h3').textContent()==='ZARA COAT 3'){
           console.log("Cart Item Number: "+ await cartItemsList.nth(i).locator('.itemNumber').textContent());
        }
    }

    await page.locator('button:has-text("Checkout")').click();
    await page.locator('div.item__details').waitFor();
    expect(await page.locator('div.item__details').isVisible()).toBeTruthy();

    // select country dynamic dropdown
    const dropdown = await page.locator('[placeholder*="Country"]');
    await dropdown.waitFor();
    await dropdown.pressSequentially('Ind')
    // await dropdown.locator('button[type="button"]').last().waitFor();
    const dropdownOptions = await page.locator('section.ta-results');
    await dropdownOptions.waitFor();

    for(let i =0;i < await dropdownOptions.locator('button[type="button"]').count(); i++){
        console.log(await dropdownOptions.locator('button[type="button"]').nth(i).textContent())
        if(await dropdownOptions.locator('button[type="button"]').nth(i).textContent() === ' India'){
            await dropdownOptions.locator('button[type="button"]').nth(i).click();
        }
    }
    expect(await dropdown.inputValue()).toContain('India');

    await expect(page.locator('div.user__name.mt-5 label[type="text"]')).toHaveText('seshu99@gmail.com');

    const monthDropdown = await page.locator('select.input.ddl').first();
    await monthDropdown.selectOption('12')

    const dayDropdown = await page.locator('select.input.ddl').last();
    await dayDropdown.selectOption('24')

    await page.locator('input[class="input txt"]').first().click()
    await page.locator('input[class="input txt"]').first().fill('432');
    await page.locator('input[class="input txt"]').last().click()
    await page.locator('input[class="input txt"]').last().fill('ABCDEFGH');
    await page.locator('input[name="coupon"]').click()
    await page.locator('input[name="coupon"]').fill('rahulshettyacademy')
    await page.locator('button:has-text("Apply Coupon")').click();
    await page.locator('p:has-text("* Coupon Applied")').waitFor();
    expect(await page.locator('p:has-text("* Coupon Applied")').textContent()).toContain('* Coupon Applied')
    await page.locator('a:has-text("Place Order ")').click()
    await page.locator('h1.hero-primary').waitFor();
    console.log("Success Message: "+await page.locator('h1.hero-primary').textContent())
    await expect(page.locator('h1.hero-primary')).toHaveText(' Thankyou for the order. ');

    const orderId = await page.locator('label.ng-star-inserted').textContent();
    console.log("Order ID: "+await page.locator('label.ng-star-inserted').textContent())


    // Navigate to My Orders
    await page.locator('button[routerlink*="myorders"]').click();

    const orderIds = await page.locator('table.table-bordered tbody th');
    await orderIds.last().waitFor();

    for(let i =0;i<await orderIds.count(); i++){
        if(orderId.includes(await orderIds.nth(i).textContent()))
            {
            console.log("Expected Order ID: "+orderId+" : Actual Order Id: "+ await orderIds.nth(i).textContent());
            expect(orderId.includes(await orderIds.nth(i).textContent())).toBeTruthy;
        }
    }

    const table = await page.locator('table.table-bordered tbody');

    for(let i =0; i < await table.locator('th').count(); i++){
            console.log("Table data: "+await table.locator('th').nth(i).textContent())
        if(orderId.includes(await table.locator('th').nth(i).textContent())){
            console.log("Expected Order ID: "+orderId+" : Actual Order Id: "+ await table.locator('th').nth(i).textContent());
            expect(orderId.includes(await table.locator('th').nth(i).textContent()))
            await table.locator('button.btn.btn-primary').nth(i).click();
            break;
        }
    }

    await page.locator('div.email-title').waitFor();
    expect(await page.locator('div.email-title').isVisible()).toBeTruthy();
    await expect(page.locator('div.email-title')).toHaveText(' order summary ')
    expect(orderId.includes(await page.locator('div.col-text.-main').textContent())).toBeTruthy()
  
})

// test('Client app practice1', async ()=>{
//     const page = await webContext.newPage();    
//     const loginPageTitle = page.locator('h1.login-title')

//     await page.goto('https://rahulshettyacademy.com/client')
//     await page.waitForLoadState('networkidle');
//     await expect(homePageTitle).toHaveText('Automation');
    

// });

test('@API Web Api test part 2', async () => {

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client')
    await page.waitForLoadState('networkidle');
    
    
})

