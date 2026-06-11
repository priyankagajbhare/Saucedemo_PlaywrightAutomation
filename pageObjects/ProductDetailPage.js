const {expect} = require('@playwright/test')

class ProductDetailPage {

    constructor(page){
        this.page = page
        this.itemTitle = this.page.locator('.inventory_details_name.large_size')
        this.itemDescription = this.page.locator('.inventory_details_desc.large_size')
        this.itemCost = this.page.locator('.inventory_details_price')
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' })
    }

    async verifyProductDetails(itemTitle, itemDescription, itemCost){
        expect( await this.itemTitle.textContent()).toEqual(itemTitle)
        expect(await this.itemDescription.textContent()).toEqual(itemDescription)
        expect(await this.itemCost.textContent()).toEqual(itemCost)
    }
}

module.exports = { ProductDetailPage}