const { test, expect } = require('@playwright/test')


class LoginPage {

    constructor(page) {
        this.page = page
        this.usernameTxtbox = page.locator('#user-name')
        this.passwordTxtbox = page.locator('#password')
        this.signInButton = page.getByRole('button', { name: 'Login' })
        this.errorContainer = page.locator('[data-test="error"]')

    }

    async gotoUrl() {
        await this.page.goto('/')
    }

    async login(username, password) {
        await this.usernameTxtbox.fill(username)
        await this.passwordTxtbox.fill(password)
        await this.signInButton.click()
    }

    async loginWithAssert(username, password) {
        await this.login(username, password)
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html')
    }

    async lockedUserLogin(username, password) {
        await this.login(username, password)
        await expect(this.errorContainer).toContainText('Sorry, this user has been locked out.')
    }


}

module.exports = { LoginPage }