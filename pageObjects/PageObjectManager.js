const {LoginPage} =require('../pageObjects/LoginPage');
const {DashboardPage} =require('../pageObjects/DashboardPage')
const {CartPage} =require('../pageObjects/CartPage');
const {CheckoutPage} =require('../pageObjects/CheckoutPage');
const {ThankYouOrderPage} =require('../pageObjects/ThankYouOrderPage');
const { MyOrdersPage } = require('./MyOrdersPage');
const { OrderSummeryPage } = require('./OrderSummeryPage');



class PageObjectManager{

    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.thankYouOrderPage = new ThankYouOrderPage(this.page);
        this.myOdersPage = new MyOrdersPage(this.page)
        this.orderSummeryPage = new OrderSummeryPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckoutPage(){
        return this.checkoutPage;
    }

    getThankYouOarderPage(){
        return this.thankYouOrderPage;
    }

    getMyOrdersPage(){
        return this.myOdersPage;
    }

    getOrderSummeryPage(){
        return this.orderSummeryPage;
    }
}
module.exports = {PageObjectManager}