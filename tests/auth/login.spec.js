const { test } = require('@playwright/test')
const { POManager } = require('../../pageObjects/POManager')

const dataset = require('../../testData/loginSpecTestData.json')

let loginPage

test.beforeEach(async ({ page }) => {

    const poManager = new POManager(page)

    loginPage = poManager.getLoginPage()

    await loginPage.gotoUrl()
})

test('Valid login with standard user', async () => {

    await loginPage.loginWithAssert(
        dataset.validUsername,
        dataset.password
    )
})

test('Login with locked out user', async () => {

    await loginPage.lockedUserLogin(
        dataset.lockedUsername,
        dataset.password
    )
})
