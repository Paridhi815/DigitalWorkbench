const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const expect = chai.expect
chai.use(chaiAsPromised)

const { logger } = require('@apifie/node-microservice')
const {
  sendRequest,
  sendResponse,
  sendRetryRequest,
  sendIncident
} = require('../../src/mq-usage')

const sampleMessage = {
  fields: {
    consumerTag: 'amq.ctag-N17x-EIrlrs0k-dp6NpyoA',
    deliveryTag: 1,
    redelivered: false,
    exchange: 'full-feature-micro-service-example-1.0.0',
    routingKey: 'testkey'
  },
  properties: { headers: { msgType: 'REQUEST' }, deliveryMode: 1 },
  content: '{"event": "TEST_MESSAGE","data": {"someKey": "someValue"},"metadata" : {"appKey": "test-app-key","appContext": "test-app-context"}}'
}

describe('When we use MQ API', async() => {
  it('We can send a request message to correct exchange', async() => {
    const res = await sendRequest('full-feature-micro-service-example-1.0.0', 'testkey')
    expect(res, 'message is successfully posted').not.to.be.null
    expect(res.exchange, 'message is posted to right exchange').to.equal('full-feature-micro-service-example-1.0.0')
    expect(res.routingKey, 'message is posted to right routing key').to.equal('testkey')
  })

  it('We can send a response message to correct exchange', async() => {
    const res = await sendResponse('full-feature-micro-service-example-1.0.0', 'testkey')
    expect(res, 'message is successfully posted').not.to.be.null
    expect(res.exchange, 'message is posted to right exchange').to.equal('full-feature-micro-service-example-1.0.0')
    expect(res.routingKey, 'message is posted to response routing key').to.equal('testkey-res')
  })

  it('We can send a retry request message to correct exchange', async() => {
    const res = await sendRetryRequest(sampleMessage)
    expect(res, 'message is successfully posted').not.to.be.null
    expect(res.exchange, 'message is posted to delayed exchange').to.equal('full-feature-micro-service-example-1.0.0-delayed')
    expect(res.routingKey, 'message is posted to right routing key').to.equal('testkey')
  })

  it('We can send an incident message to incident exchange', async() => {
    const res = await sendIncident(sampleMessage, { message: 'Test Incident' })
    logger.info('res = ', res)
    expect(res, 'message is successfully posted').not.to.be.null
    expect(res.exchange, 'message is posted to incident exchange').to.equal('incident-1.0.0')
    expect(res.routingKey, 'message is posted to Error routing key').to.equal('Error')
  })
})
