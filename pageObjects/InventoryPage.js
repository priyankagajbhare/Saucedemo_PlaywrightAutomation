const { expect } = require('@playwright/test')
const { createLogger } = require('../utils/logger')

class InventoryPage {

    constructor(page) {
        this.page = page
        this.log = createLogger('InventoryPage')
        this.sortDropdown = page.locator('select.product_sort_container')
        this.InvItemNames = page.locator('.inventory_item_name')
        this.cartBadge = this.page.locator('.shopping_cart_badge')
    }

    itemNameLink(itemName){
        return this.page.locator('.inventory_item_name').filter({hasText: itemName})
    }

    addToCartButton(itemName){
        return this.page.locator('.inventory_item_description').filter({ hasText: itemName }).getByRole('button', { hasText: 'Add to cart' })
    }

    removeFromCartButton(itemName){
        return this.page.locator('.inventory_item_description').filter({ hasText: itemName }).getByRole('button', { hasText: 'Remove' })
    }

    async allProductNamesInInventory() {
        let productNames = await this.InvItemNames.allTextContents()
        this.log.debug('Fetched product names', { count: productNames.length })
        return productNames
    }

    async verifyProductNames(expectedNamesList) {
        let actualNamesList = await this.allProductNamesInInventory()
        this.log.info('Verifying product names', { expectedCount: expectedNamesList.length })
        expect(actualNamesList).toEqual(expectedNamesList)
    }

    async sortItems(sortOption) {
        this.log.info('Sorting inventory', { sortOption })
        await this.sortDropdown.selectOption({ label: sortOption })
    }

    async addToCart(itemName){
        this.log.info('Adding item to cart', { itemName })
        await this.addToCartButton(itemName).click()
    }

    async removeFromCart(itemName){
        this.log.info('Removing item from cart', { itemName })
        await this.removeFromCartButton(itemName).click()
    }

    async openItemDetails(itemName){
        this.log.info('Opening item details', { itemName })
        await this.itemNameLink(itemName).click()
    }

    async verifyCartCount(count){
        this.log.info('Verifying cart count', { count })
        await expect(this.cartBadge).toContainText(count)
    }

    async verifyItemAlreadyAddedToCart(itemName){
        await expect(this.removeFromCartButton(itemName)).toBeVisible()
    }

    async verifyNoItemsInCart(){
        this.log.info('Verifying no items in cart')
        await expect(this.cartBadge).toBeHidden()
    }
}

module.exports = { InventoryPage }