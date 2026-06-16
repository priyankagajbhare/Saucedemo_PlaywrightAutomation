const { test } = require('@playwright/test')
const { POManager } = require('../../pageObjects/POManager')
const dataset = require('../../testData/inventorySpecTestData.json')
const { createLogger } = require('../../utils/logger')

const log = createLogger('inventory.spec')

test.beforeEach(async ({ page }, testInfo) => {
    log.info('Test started', { title: testInfo.title })

    const poManager = new POManager(page)

    page.inventoryPage = poManager.getInventoryPage()
    page.productDetailPage = poManager.getProductDetailPage()

    await page.goto('/inventory.html')
})

test('Verify product list loads after login @regression @smoke', async ({ page }) => {

    const itemList = dataset.actualList
    log.info('Verifying product list loads after login', { itemList: itemList })
    await page.inventoryPage.verifyProductNames(itemList)
})

test('Sort products by Price low to high @regression', async ({ page }) => {

    const itemList = dataset.lowToHighList
    log.info('Sorting products by Price low to high', { itemList: itemList })
    await page.inventoryPage.sortItems('Price (low to high)')
    log.info('Verifying product list is sorted by Price low to high', { itemList: itemList })
    await page.inventoryPage.verifyProductNames(itemList)
})

test('Sort products by Name A-Z @regression', async ({ page }) => {

    const itemList = dataset.actualList.reverse()
    log.info('Sorting products by Name A-Z', { itemList: itemList })
    await page.inventoryPage.sortItems('Name (Z to A)')
    log.info('Verifying product list is sorted by Name A-Z', { itemList: itemList })
    await page.inventoryPage.verifyProductNames(itemList)

})

test('Verify user can open a product detail page @regression @smoke', async ({ page }) => {
    await page.inventoryPage.openItemDetails(dataset.productName)
    log.info('Verifying product details', { productName: dataset.productName, productDescription: dataset.productDescription, cost: dataset.cost })
    await page.productDetailPage.verifyProductDetails(dataset.productName, dataset.productDescription, dataset.cost)
    log.info('Product details verified')
})

test('Verify one product can be added to cart @regression', async ({ page }) => {
    await page.goto('/inventory.html')
    log.info('Adding product to cart', { productName: dataset.productName })
    await page.inventoryPage.addToCart(dataset.productName)
    log.info('Verifying product is added to cart', { productName: dataset.productName })
    await page.inventoryPage.verifyCartCount('1')
    log.info('Product added to cart verified')
})

test('Remove single item from inventory page @regression', async ({ page }) => {
    await page.goto('/inventory.html')
    if (await page.inventoryPage.verifyItemAlreadyAddedToCart(dataset.productName)) {
        log.info('Product is already added to cart', { productName: dataset.productName })
        log.info('Removing product from cart', { productName: dataset.productName })
        await page.inventoryPage.removeFromCart(dataset.productName)
    } else {
        await page.inventoryPage.addToCart(dataset.productName)
        log.info('Product added to cart', { productName: dataset.productName })
    }
    await page.inventoryPage.removeFromCart(dataset.productName)
    log.info('Verifying product is removed from cart', { productName: dataset.productName })
    await page.inventoryPage.verifyNoItemsInCart()
    log.info('Product removed from cart verified')
})

test('Verify multiple products can be added @regression', async ({ page }) => {
    let items_to_add = ["Sauce Labs Backpack",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt"]
    await page.goto('./inventory.html')
    for (const item of items_to_add) {
        if (await page.inventoryPage.verifyItemAlreadyAddedToCart(item)) {
            log.info('Product is already added to cart', { productName: item })
            log.info('Removing product from cart', { productName: item })
            await page.inventoryPage.removeFromCart(item)
        }
        await page.inventoryPage.addToCart(item)
    }
    await page.inventoryPage.verifyCartCount('3')
})

