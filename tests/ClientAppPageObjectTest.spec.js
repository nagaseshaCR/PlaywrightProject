const {test, expect} = require('@playwright/test')
const {LoginPage}=require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')
const {CartPage} = require('../pageObjects/CartPage')
const {CheckoutPage} = require('../pageObjects/CheckoutPage')
const {ThankYouOrderPage}=require('../pageObjects/ThankYouOrderPage')

test('Browser context validation error', async ({page})=>{
    const username = 'seshu99@gmail.com';
    const password ='Seshu24@';
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page)
   
    const homePageTitle = page.locator('div.left.mt-1 h3')
    const productTitles = page.locator('h5 b')
    // await page.goto('https://rahulshettyacademy.com/client')
    loginPage.goTo();
    loginPage.validLogin(username, password)
  
    await expect(homePageTitle).toHaveText('Automation'); // page header
    await page.waitForLoadState('networkidle'); // wait for page load
    await productTitles.last().waitFor(); // wait for single element from the list
    const pTitles = await productTitles.allTextContents()
    console.log(pTitles)

})

test('Client app practice place order', async ({page})=>{

     const username = 'seshu99@gmail.com';
    const password ='Seshu24@';
    const productName = 'ZARA COAT 3';
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page)
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const thankYouOrderPage = new ThankYouOrderPage(page);
    // const cartItemsList = page.locator('div.infoWrap');
    let cartItemNumber;

    await loginPage.goTo('https://rahulshettyacademy.com/client')
   
    await loginPage.validLogin(username, password)
    await page.waitForLoadState('networkidle'); // wait for page load

    await dashboardPage.searchProductAddToCart(productName);

    await dashboardPage.navigateToCart();

    console.log("Cart Item Name: "+await cartPage.getProductName(productName))
    const bool = await cartPage.productToBeVisible(productName);
    expect(bool).toBeTruthy();
    // for(let i =0; i < await cartItemsList.count(); i++){
    //     if(await cartItemsList.nth(i).locator('h3').textContent()==='ZARA COAT 3'){
    //        console.log("Cart Item Number: "+ await cartItemsList.nth(i).locator('.itemNumber').textContent());
    //     }
    // }
    cartItemNumber = await cartPage.getCartItemNumber(productName)
    console.log("Cart Item Number: "+cartItemNumber)
    await cartPage.clickOnCheckOutButton();
    await page.locator('div.item__details').waitFor();
    expect(await page.locator('div.item__details').isVisible()).toBeTruthy();


    await checkoutPage.selectCountryDropdown('Ind', ' India');
    expect(await checkoutPage.getCountryDropdownSelectedText()).toContain('India')
    expect(await checkoutPage.CountryDropdown.inputValue()).toContain('India');

    // await expect(page.locator('div.user__name.mt-5 label[type="text"]')).toHaveText('seshu99@gmail.com');

    // const monthDropdown = await page.locator('select.input.ddl').first();
    // await monthDropdown.selectOption('12')

    // const dayDropdown = await page.locator('select.input.ddl').last();
    // await dayDropdown.selectOption('24')

    // await page.locator('input[class="input txt"]').first().click()
    // await page.locator('input[class="input txt"]').first().fill('432');
    // await page.locator('input[class="input txt"]').last().click()
    // await page.locator('input[class="input txt"]').last().fill('ABCDEFGH');
    // await page.locator('input[name="coupon"]').click()
    await checkoutPage.setApplyCoupon('rahulshettyacademy')
    await checkoutPage.clickOnApplyCouponButton();
    // await page.locator('p:has-text("* Coupon Applied")').waitFor();
    expect(await checkoutPage.getCouponAppliedSuccessMessage()).toContain('* Coupon Applied')
    await checkoutPage.clickOnPlaceOrderButton();
    await page.locator('h1.hero-primary').waitFor();
    console.log("Success Message: "+await thankYouOrderPage.getOderSuccessMessage())
    await expect(await thankYouOrderPage.orderSuccessMessage).toHaveText(' Thankyou for the order. ');

    const orderId = await thankYouOrderPage.getOrderId();
    console.log("Order ID: "+ await thankYouOrderPage.getOrderId())


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

