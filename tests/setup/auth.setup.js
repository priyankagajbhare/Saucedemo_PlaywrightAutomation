// tests/setup/auth.setup.js

const { test } = require('@playwright/test')
const dataset = require('../../testData/loginSpecTestData.json')
const { POManager } = require('../../pageObjects/POManager')
const { createLogger } = require('../../utils/logger')

const log = createLogger('auth.setup')

test('authenticate', async ({ page }) => {
    log.info('Saving authenticated storage state')

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

    log.info('Storage state saved', { path: 'playwright/.auth/user.json' })
})