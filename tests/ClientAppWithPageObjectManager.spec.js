const {test, expect} = require('@playwright/test')
const {PageObjectManager}=require('../pageObjects/PageObjectManager');
const { OrderSummeryPage } = require('../pageObjects/OrderSummeryPage');

test('Client app place practice', async ({page})=>{

     const username = 'seshu99@gmail.com';
    const password ='Seshu24@';
    const productName = 'ZARA COAT 3';
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPage();
    const dashboardPage = pageObjectManager.getDashboardPage();
    const cartPage = pageObjectManager.getCartPage();
    const checkoutPage = pageObjectManager.getCheckoutPage();
    const thankYouOrderPage = pageObjectManager.getThankYouOarderPage();
    const myOrdersPage = pageObjectManager.getMyOrdersPage()
    const orderSummeryPage = pageObjectManager.getOrderSummeryPage();
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

    cartItemNumber = await cartPage.getCartItemNumber(productName)
    console.log("Cart Item Number: "+cartItemNumber)
    await cartPage.clickOnCheckOutButton();
    await page.locator('div.item__details').waitFor();
    expect(await page.locator('div.item__details').isVisible()).toBeTruthy();


    await checkoutPage.selectCountryDropdown('Ind', ' India');
    expect(await checkoutPage.getCountryDropdownSelectedText()).toContain('India')
    expect(await checkoutPage.CountryDropdown.inputValue()).toContain('India');

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
    await dashboardPage.clickOnMyOrdersLink();

    expect(orderId.includes(await myOrdersPage.findOrderId(orderId))).toBeTruthy;


    await myOrdersPage.clickOnViewButton(orderId)
    await expect( await orderSummeryPage.pageTitle).toBeVisible();
    await expect(await orderSummeryPage.pageTitle).toHaveText(' order summary ')
    expect(orderId.includes(await orderSummeryPage.getOrderId())).toBeTruthy()




    
    
})

