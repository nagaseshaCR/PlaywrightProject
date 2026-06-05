const { test, request, expect } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const loginPayLoad = { userEmail: "seshu99@gmail.com", userPassword: "Seshu24@" };
const createOrder = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let response;
const fakeResponse = { data: [], message: "No Orders" }
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(createOrder);

})


test('Client app practice', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client')

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', async route => {
        const response1 = await page.request.fetch(route.request());
        let body = JSON.stringify(fakeResponse);
        route.fulfill({
            response1,
            body
        });
    })

    // Navigate to My Orders
    await page.locator('button[routerlink*="myorders"]').click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    // await page.waitForLoadState('networkidle');
    const summery = await page.locator('div.table-responsive div').textContent();
    console.log("Messahe: " + summery);
    await expect(summery).toEqual(' You have No Orders to show at this time. Please Visit Back Us ')


    // const orderIds = await page.locator('table.table-bordered tbody th');
    // await orderIds.last().waitFor();

    // for(let i =0;i<await orderIds.count(); i++){
    //     if(response.orderID.includes(await orderIds.nth(i).textContent()))
    //         {
    //         console.log("Expected Order ID: "+response.orderID+" : Actual Order Id: "+ await orderIds.nth(i).textContent());
    //         expect(response.orderID.includes(await orderIds.nth(i).textContent())).toBeTruthy;
    //     }
    // }

    // const table = await page.locator('table.table-bordered tbody');

    // for(let i =0; i < await table.locator('th').count(); i++){
    //         console.log("Table data: "+await table.locator('th').nth(i).textContent())
    //     if(response.orderID.includes(await table.locator('th').nth(i).textContent())){
    //         console.log("Expected Order ID: "+response.orderID+" : Actual Order Id: "+ await table.locator('th').nth(i).textContent());
    //         expect(response.orderID.includes(await table.locator('th').nth(i).textContent()))
    //         await table.locator('button.btn.btn-primary').nth(i).click();
    //         break;
    //     }
    // }

    // await page.locator('div.email-title').waitFor();
    // expect(await page.locator('div.email-title').isVisible()).toBeTruthy();
    // await expect(page.locator('div.email-title')).toHaveText(' order summary ')
    // expect(response.orderID.includes(await page.locator('div.col-text.-main').textContent())).toBeTruthy()

})