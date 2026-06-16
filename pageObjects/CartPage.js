const { expect } = require('@playwright/test')
const { createLogger } = require('../utils/logger')

class CartPage {

    constructor(page) {
        this.page = page
        this.cartIcon = this.page.locator('.shopping_cart_link')
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' })

    }

    itemRemoveButton(itemName) {
        return this.page.locator('.cart_item_label').filter({ hasText: itemName }).getByRole('button', { hasText: 'Remove' })
    }

    async removeItemfromCart(itemName) {
        await this.itemRemoveButton(itemName).click()
    }

    async goToCartPage() {
        await this.cartIcon.click()
    }

    async verifyItemPresentInCart(itemName) {
        expect(await this.page.locator('.cart_item_label').filter({ hasText: itemName })).toBeVisible()
    }

    async verifyItemNotPresentInCart(itemName) {
        expect(await this.page.locator('.cart_item_label').filter({ hasText: itemName })).toBeHidden()
    }

    async proceedToCheckout() {
        await this.checkoutButton.click()
    }
}

module.exports = { CartPage }