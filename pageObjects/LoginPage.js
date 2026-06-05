class LoginPage{

    constructor(page){
        this.page = page;
        this.loginPageTitle = page.locator('h1.login-title')
        this.username = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.signInButton =  page.locator('#login')
        this.page.waitForLoadState('networkidle');
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client')
    }

    async validLogin(username, password){
        await this.username.type(username)
        await this.password.type(password);
        await this.signInButton.click()
    }
}
module.exports = {LoginPage}