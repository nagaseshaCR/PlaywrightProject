class CheckoutPage{

    constructor(page){
        this.page = page;
        this.CountryDropdown =  page.locator('[placeholder*="Country"]');
        this.CountryDropdownOptions =  page.locator('section.ta-results');
        this.applyCoupon = page.locator('input[name="coupon"]');
        this.applyCouponButton = page.locator('button:has-text("Apply Coupon")');
        this.successMessageCouponApplied = page.locator('p:has-text("* Coupon Applied")');
        this.placeOrderButton = page.locator('a:has-text("Place Order ")');

    }

    async selectCountryDropdown(searchText, selectText){
        await this.CountryDropdown.waitFor();
        await this.CountryDropdown.pressSequentially(searchText)
        await this.CountryDropdownOptions.last().waitFor();
        for(let i =0; i < await this.CountryDropdownOptions.locator('button[type="button"]').count(); i++){
            console.log("Country name: "+await this.CountryDropdownOptions.locator('button[type="button"]').nth(i).textContent())
            if(await this.CountryDropdownOptions.locator('button[type="button"]').nth(i).textContent()=== selectText){
                await this.CountryDropdownOptions.locator('button[type="button"]').nth(i).click();
                break;
            }
        }
    }

    async getCountryDropdownSelectedText(){
        return await this.CountryDropdown.inputValue();
    }

    async setApplyCoupon(coupon){
        await this.applyCoupon.fill(coupon);
    }

    async clickOnApplyCouponButton(){
        await this.applyCouponButton.click();
    }

    async getCouponAppliedSuccessMessage(){
        return await this.successMessageCouponApplied.textContent();
    }

    async clickOnPlaceOrderButton(){
        await this.placeOrderButton.click();
    }
}
module.exports = {CheckoutPage}