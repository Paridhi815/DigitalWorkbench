const chai = require('chai')

const expect = chai.expect

const {
  getTracerClient,
  getCacheClient,
  getSqlDBClient,
  getMqClient,
  getMiddleware,
  getApiClient,
  getUtils,
  logger,
  errors
} = require('@apifie/node-microservice')

const proxyquire = require('proxyquire')

const bpStub = {
  serviceBootstrapper () {
    console.log('microservice-blueprint-nodejs Stub called')
    return {
      app: 'app',
      cache: 'cache',
      mq: 'mq',
      sqlDb: 'sqlDb',
      api: 'api',
      routes: 'routes',
      trace: {
        tracer: 'tracer'
      }
    }
  }
}

const service = proxyquire('./../../src/index', { '@apifie/node-microservice': bpStub })
const { setChai } = require('./helpers/test-suite-setup')

describe('Service startup file (index.js) provides getter functions', () => {
  setChai()
  describe('Which when called before bootstrapping the service', () => {
    it('Returns an undefined for all components', () => {
      expect(getCacheClient, 'Cache client is undefined').to.throw(errors.ComponentError)
      expect(getSqlDBClient, 'DB client is undefined').to.throw(errors.ComponentError)
      expect(getMqClient, 'MQ client is undefined').to.throw(errors.ComponentError)
      expect(getApiClient, 'Api middleware components is undefined').to.throw(errors.ComponentError)
      expect(getMiddleware, 'Routes Middleware components is undefined').to.throw(errors.ComponentError)
      expect(getTracerClient, 'Tracer is undefined').to.throw(errors.ComponentError)
      expect(getUtils, 'Utils is undefined').to.throw(errors.ComponentError)
    })

    it('Logger and error are available even without bootstrapping', () => {
      expect(logger, 'logger is available').not.to.be.an('undefined')
      expect(errors, 'MQ is not available').not.to.be.an('undefined')
    })
  })

  describe('Which when called after (pseudo) bootstrapping the service', async () => {
    await it('Returns an undefined for all components', async () => {
      await service.bootstrapService()
      expect(getCacheClient, 'Cache client is undefined').to.throw(errors.ComponentError)
      expect(getSqlDBClient, 'DB client is undefined').to.throw(errors.ComponentError)
      expect(getMqClient, 'MQ client is undefined').to.throw(errors.ComponentError)
      expect(getApiClient, 'Api middleware components is undefined').to.throw(errors.ComponentError)
      expect(getMiddleware, 'Routes Middleware components is undefined').to.throw(errors.ComponentError)
      expect(getTracerClient, 'Tracer is undefined').to.throw(errors.ComponentError)
      expect(getUtils, 'Utils is undefined').to.throw(errors.ComponentError)
    })

    await it('Logger and error are available even without bootstrapping', async () => {
      await service.bootstrapService()
      expect(logger, 'logger is available').not.to.be.an('undefined')
      expect(errors, 'MQ is not available').not.to.be.an('undefined')
    })
  })
})
