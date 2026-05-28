const { expect } = require('@playwright/test')

class InventoryPage {

    constructor(page) {
        this.page = page
        this.sortDropdown = page.locator('select.product_sort_container')
        this.InvItemNames = page.locator('.inventory_item_name')
    }

    async allProductNamesInInventory() {
        let productNames = await this.InvItemNames.allTextContents()
        return productNames
    }

    async verifyProductNames(expectedNamesList) {
        let actualNamesList = await this.allProductNamesInInventory()
        expect(actualNamesList).toEqual(expectedNamesList)
    }

    async sortItems(sortOption) {
        await this.sortDropdown.selectOption({ label: sortOption })
    }
}

module.exports = { InventoryPage }