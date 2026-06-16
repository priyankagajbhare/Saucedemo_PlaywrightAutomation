const { LoginPage } = require('../pageObjects/LoginPage')
const { InventoryPage } = require('../pageObjects/InventoryPage')
const { ProductDetailPage } = require('../pageObjects/ProductDetailPage')
const { CartPage } = require('../pageObjects/CartPage')
const { CheckoutPage } = require('../pageObjects/CheckoutPage')


class POManager {

    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.inventoryPage = new InventoryPage(this.page)
        this.productDetailsPage = new ProductDetailPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
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

    getCartPage() {
        return this.cartPage
    }

    getCheckoutPage() {
        return this.checkoutPage
    }
}

module.exports = { POManager }