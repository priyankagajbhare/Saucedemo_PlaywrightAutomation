const { expect } = require('@playwright/test')
const { createLogger } = require('../utils/logger')

class CheckoutPage {

    constructor(page) {
        this.page = page
        this.checkoutPageTitle = this.page.getByText('Checkout: Your Information', { exact: true })
        this.firstName = this.page.locator('#first-name')
        this.lastName = this.page.locator('#last-name')
        this.zipCode = this.page.locator('#postal-code')
        this.cancelButton = this.page.locator('#cancel')
        this.continueButton = this.page.locator('#continue')
        this.errorContainer = page.locator('[data-test="error"]')
    }

    async verifyCheckoutPageTitle() {
        expect(await this.checkoutPageTitle).toBeVisible()
    }

    async enterUserDetails(firstName, lastName, zipCode) {
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.zipCode.fill(zipCode)
        await this.continueButton.click()
    }

    async verifyErrorMessage(errorMessage) {
        expect(await this.errorContainer.textContent()).toContain(errorMessage)
    }

    async verifyItemPresentInList(itemName) {
        expect(await this.page.locator('.cart_item_label').filter({ hasText: itemName })).toBeVisible()
    }
}

module.exports = { CheckoutPage }