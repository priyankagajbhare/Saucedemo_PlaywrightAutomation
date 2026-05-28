// @ts-check

require('dotenv').config()

const { defineConfig, devices } = require('@playwright/test')
const { on } = require('node:cluster')

module.exports = defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',


  use: {

    baseURL: process.env.BASE_URL,

    headless: false,

    trace: 'on',

    screenshot: 'only-on-failure'
  },

  projects: [

    {
      name: 'setup',

      testMatch: /.*auth\.setup\.js/,

      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'auth-tests',

      testMatch: /.*auth.*\.spec\.js/,

      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'e2e-tests',

      dependencies: ['setup'],

      testMatch: /.*(inventory|checkout).*\.spec\.js/,

      use: {

        ...devices['Desktop Chrome'],

        storageState: 'playwright/.auth/user.json'
      }
    }
  ]
})