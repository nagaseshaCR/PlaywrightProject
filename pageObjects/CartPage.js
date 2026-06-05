class CartPage {

    constructor(page) {
        this.page = page;
        this.cartItemsList = page.locator('div.infoWrap');
        this.checkoutButton = page.locator('button:has-text("Checkout")')
    }

    async getProductName(productName) {
        return await this.page.locator('h3:has-text("' + productName + '")').textContent()
    }

    async productToBeVisible(productName) {
        return await this.page.locator('h3:has-text("' + productName + '")').isVisible()
    }

    async getCartItemNumber(productName) {
        for (let i = 0; i < await this.cartItemsList.count(); i++) {
            if (await this.cartItemsList.nth(i).locator('h3').textContent() === productName) {
                return console.log("Cart Item Number: " + await this.cartItemsList.nth(i).locator('.itemNumber').textContent());
            }
        }
    }

    async clickOnCheckOutButton(){
        this.checkoutButton.waitFor();
        this.checkoutButton.click();
    }

}
module.exports = { CartPage }