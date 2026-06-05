class MyOrdersPage {

    constructor(page) {
        this.page = page;
        this.orderIds = page.locator('table.table-bordered tbody th');
        this.table = page.locator('table.table-bordered tbody');
    }

    async findOrderId(orderId) {
        await this.orderIds.last().waitFor();

        for (let i = 0; i < await this.orderIds.count(); i++) {
            if (orderId.includes(await this.orderIds.nth(i).textContent())) {
                console.log("Expected Order ID: " + orderId + " : Actual Order Id: " + await this.orderIds.nth(i).textContent());
                return await this.orderIds.nth(i).textContent()
            }
        }

    }

    async clickOnViewButton(orderId) {
        for (let i = 0; i < await this.table.locator('th').count(); i++) {
            console.log("Table data: " + await this.table.locator('th').nth(i).textContent())
            if (orderId.includes(await this.table.locator('th').nth(i).textContent())) {
                console.log("Expected Order ID: " + orderId + " : Actual Order Id: " + await this.table.locator('th').nth(i).textContent());
                // expect(orderId.includes(await this.table.locator('th').nth(i).textContent()))
                await this.table.locator('button.btn.btn-primary').nth(i).click();
                break;
            }
        }
    }


}
module.exports = { MyOrdersPage }