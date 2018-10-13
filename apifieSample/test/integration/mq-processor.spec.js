const chai = require('chai')

const expect = chai.expect

const { setChai } = require('../unit/helpers/test-suite-setup')
const processTestMessage = require('../../src/mq-processor-usage')

const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

describe('Test message processor', () => {
  setChai()

  describe('When processing a message with key = SoftErrorPass', () => {
    it('Should throw a SoftError for retryCount = 0', async () => expect(processTestMessage({ appKey: 'SoftErrorPass' }, {}, 0)).to.eventually.be.rejectedWith('Sending SoftError'))

    it('Should send a response  for retryCount = 1', async () => expect(processTestMessage({ appKey: 'SoftErrorPass' }, {}, 1)).to.eventually.be.fulfilled)
  })

  describe('When processing a message with key = SoftError', () => {
    it('Should throw a SoftError for retryCount = 0', async () => expect(processTestMessage({ appKey: 'SoftError' }, {}, 0)).to.eventually.be.rejectedWith('Sending SoftError'))

    it('Should throw a HardError for retryCount = 1', async () => expect(processTestMessage({ appKey: 'SoftError' }, {}, 1)).to.eventually.be.rejectedWith('Sending HardError'))

    it('Should throw a HardError for retryCount = 2', async () => expect(processTestMessage({ appKey: 'SoftError' }, {}, 2)).to.eventually.be.rejectedWith('Sending HardError'))
  })

  describe('When processing a message with key = HardError', () => {
    it('Should throw a HardError', async() => expect(processTestMessage({ appKey: 'HardError' }, {}, 0)).to.eventually.be.rejectedWith('Sending HardError'))
  })

  describe('When processing a message with key = FailureIncident', () => {
    it('Should throw a FailureIncident', async() => expect(processTestMessage({ appKey: 'FailureIncident' }, {}, 0)).to.eventually.be.rejectedWith('Sending FailureIncident'))
  })

  describe('When processing a message with key = xxx', () => {
    it('Should send a response', async() => expect(processTestMessage({ appKey: 'xxx' }, {}, 0)).to.eventually.be.fulfilled)
  })
})
