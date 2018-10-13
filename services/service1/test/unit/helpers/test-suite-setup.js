const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const spies = require('chai-spies')

function setChai () {
  console.log('Setting Chai keys')
  chai.config.proxyExcludedKeys.push('eventually')
  chai.config.proxyExcludedKeys.push('rejected')
  chai.use(chaiAsPromised)
  chai.use(spies)
}

before(() => {
  console.log('In before test')
  setChai()
})

module.exports = {
  setChai
}
