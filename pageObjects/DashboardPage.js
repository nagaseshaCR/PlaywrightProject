class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('div.card-body')
        this.productTitles = page.locator('h5 b')
        this.shoppingCart = page.locator('[routerlink*="cart"]');
        this.myOrdersLink = page.locator('button[routerlink*="myorders"]');

    }

    async searchProductAddToCart(productName) {
        await this.page.waitForLoadState('networkidle');
        await this.products.last().waitFor();
        const countItems = await this.products.count();
        console.log(countItems)
        for (let i = 0; i < countItems; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                console.log("Product Name: " + await this.products.nth(i).locator('b').textContent());
                console.log("Product Price: " + await this.products.nth(i).locator('.text-muted').textContent());
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCart(){
        await this.shoppingCart.click();
    }

     async clickOnMyOrdersLink(){
        await this.myOrdersLink.click();
    }
}
module.exports = { DashboardPage };