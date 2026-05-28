// tests/setup/auth.setup.js

const { test } = require('@playwright/test')
const dataset = require('../../testData/loginSpecTestData.json')
const { POManager } = require('../../pageObjects/POManager')

test('authenticate', async ({ page }) => {

    const poManager = new POManager(page)

    const loginPage = poManager.getLoginPage()

    await loginPage.gotoUrl()

    await loginPage.login(
        dataset.validUsername,
        dataset.password
    )

    await page.context().storageState({

        path: 'playwright/.auth/user.json'
    })
})