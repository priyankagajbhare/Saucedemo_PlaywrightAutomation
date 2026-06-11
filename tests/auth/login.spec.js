const { test } = require('@playwright/test')
const { POManager } = require('../../pageObjects/POManager')
const { createLogger } = require('../../utils/logger')

const dataset = require('../../testData/loginSpecTestData.json')
const log = createLogger('login.spec')

let loginPage

test.beforeEach(async ({ page }, testInfo) => {
    log.info('Test started', { title: testInfo.title })

    const poManager = new POManager(page)

    loginPage = poManager.getLoginPage()

    await loginPage.gotoUrl()
})

test('Valid login with standard user', async () => {

    log.info('Logging in with standard user', { username: dataset.validUsername, password: dataset.password })
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

test('Login with invalid password', async () => {
    log.info('Logging in with invalid password', { username: dataset.validUsername, password: dataset.invalidPassword })
    await loginPage.login(dataset.validUsername, dataset.invalidPassword)
    await loginPage.verifyErrorMessage('Username and password do not match any user in this service')
})

test('Login with blank username', async () => { 
    log.info('Logging in with blank username', { password: dataset.password })
    await loginPage.login("", dataset.password)
    await loginPage.verifyErrorMessage('Username is required')
})

test('Login with blank password', async () => {
    log.info('Logging in with blank password', { username: dataset.validUsername })
    await loginPage.login(dataset.validUsername, "")
    await loginPage.verifyErrorMessage('Password is required')
})

test('Login with blank username and password', async () => {
    log.info('Logging in with blank username and password')
    await loginPage.login("", "")
    await loginPage.verifyErrorMessage('Username is required')
})

test('Verify handling of spaces in credentials Username and password do not match any user in this service', async () => {
    log.info('Logging in with spaces in credentials', { username: dataset.validUsername+' ', password: dataset.password+" "})
    await loginPage.login(dataset.validUsername+' ', dataset.password+" ")
    await loginPage.verifyErrorMessage('Username and password do not match any user in this service')
})