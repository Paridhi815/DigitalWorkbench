const { bootstrapService } = require('../../../src')
const express = require('../../../bin/www')
const chai = require('chai')

let server
let app
let testService

function setChai () {
  console.log('Setting Chai keys')
  chai.config.proxyExcludedKeys.push('eventually')
  chai.config.proxyExcludedKeys.push('rejected')
}

async function stopServer () {
  console.log('Stopping test app')
  app = undefined
  if (server) {
    console.log('Shutting down test server')
    try {
      await server.close(() => {
        console.log('Test server is shut down now')
      })
    } catch (err) {
      console.log('error in shutting down the test server %s', err)
    }
  }
}

async function startService () {
  return testService
}

before(async () => {
  console.log('In before test')
  setChai()
  console.log('Starting test app')
  server = express.server
  app = express.app
  testService = await bootstrapService(app)
  console.log('Got test express app in before')
})

after(async () => {
  console.log('In after test')
  await stopServer()
})

module.exports = {
  startService
}
