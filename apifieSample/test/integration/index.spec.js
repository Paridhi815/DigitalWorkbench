const chai = require('chai')

const expect = chai.expect

const { startService } = require('./helpers/test-server')
const { getTracerClient, getCacheClient, getSqlDBClient } = require('@apifie/node-microservice')
const { getMqClient, getMiddleware, getApiClient } = require('@apifie/node-microservice')
const { getUtils, logger, errors } = require('@apifie/node-microservice')

describe('When we bootstrap (apifie) our service with our required config', () => {
  it('Our service gets bootstrapped', async() => {
    const testService = await startService()
    return expect(testService, 'Service is not undefined').not.to.be.an('undefined')
  })

  it('After bootstrapping of service, Components are available for use', () => {
    expect(getCacheClient, 'Cache client is not undefined').to.not.throw()
    expect(getSqlDBClient, 'DB client is not undefined').to.not.throw()
    expect(getMqClient, 'MQ client is not undefined').to.not.throw()
    expect(getApiClient, 'Api middleware components is not undefined').to.not.throw()
    expect(getMiddleware, 'Routes Middleware components is not undefined').to.not.throw()
    expect(getTracerClient, 'Tracer is not undefined').to.not.throw()
    expect(getUtils, 'Utils is not undefined').to.not.throw()
  })

  it('Logger and error are available after bootstrapping also', () => {
    expect(logger, 'logger is available').not.to.be.an('undefined')
    expect(errors, 'MQ is not available').not.to.be.an('undefined')
  })
})
