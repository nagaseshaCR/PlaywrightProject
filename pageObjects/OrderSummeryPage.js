class OrderSummeryPage{

    constructor(page){
        this.page = page;
        this.pageTitle = page.locator('div.email-title');
        this.orderId = page.locator('div.col-text.-main');
    }

    async getPageTitleText(){
        return await this.pageTitle.textContent();
    }

    async getOrderId(){
        return await this.orderId.textContent();
    }


}
module.exports = {OrderSummeryPage}