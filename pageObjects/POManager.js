const { LoginPage } = require('../pageObjects/LoginPage')
const { InventoryPage } = require('../pageObjects/InventoryPage')
const {ProductDetailPage} = require('../pageObjects/ProductDetailPage')

class POManager {

    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.inventoryPage = new InventoryPage(this.page)
        this.productDetailsPage = new ProductDetailPage(this.page)
    }

    getLoginPage() {
        return this.loginPage
    }

    getInventoryPage() {
        return this.inventoryPage
    }

    getProductDetailPage() {
        return this.productDetailsPage
    }
}

module.exports = { POManager }