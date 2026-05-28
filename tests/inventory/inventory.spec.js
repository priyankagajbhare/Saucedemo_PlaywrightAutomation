const { test } = require('@playwright/test')
const { POManager } = require('../../pageObjects/POManager')
const dataset = require('../../testData/inventorySpecTestData.json')

test.beforeEach(async ({ page }) => {

    const poManager = new POManager(page)

    page.inventoryPage = poManager.getInventoryPage()

    await page.goto('/inventory.html')
})

test('Verify product list loads after login', async ({ page }) => {

    const itemList = dataset.actualList

    await page.inventoryPage.verifyProductNames(itemList)
})

test('Sort products by Price low to high', async ({ page }) => {

    const itemList = dataset.lowToHighList

    await page.inventoryPage.sortItems('Price (low to high)')

    await page.inventoryPage.verifyProductNames(itemList)
})

test('Sort products by Name A-Z', async ({ page }) => {

    const itemList = dataset.actualList.reverse()
    await page.inventoryPage.sortItems('Name (Z to A)')
    await page.inventoryPage.verifyProductNames(itemList)

})