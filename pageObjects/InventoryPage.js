const { expect } = require('@playwright/test')
const { createLogger } = require('../utils/logger')

class InventoryPage {

    constructor(page) {
        this.page = page
        this.log = createLogger('InventoryPage')
        this.sortDropdown = page.locator('select.product_sort_container')
        this.InvItemNames = page.locator('.inventory_item_name')
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
}

module.exports = { InventoryPage }