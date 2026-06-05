class ThankYouOrderPage{

    constructor(page){
        this.page = page;
        this.orderSuccessMessage = page.locator('h1.hero-primary');
        this.orderId = page.locator('label.ng-star-inserted');
    }

    async getOderSuccessMessage(){
        return await this.orderSuccessMessage.textContent();
    }

    async getOrderId(){
        return await this.orderId.textContent()
    }
}
module.exports = {ThankYouOrderPage}