const cls = require('cls-hooked')
// const EventEmitter = require('events')

cls.createNamespace('default')

const { serviceSetup, mqListeners } = require('./config/service-setup')
const { logger, serviceBootstrapper, getUtils } = require('@apifie/node-microservice')

let apifiedApp

async function bootstrapService (app, generateApiDocs) {
  logger.info('Requesting service bootstrap for your app')

  try {
    apifiedApp = await serviceBootstrapper(serviceSetup, mqListeners, app)
    if (generateApiDocs) {
      logger.info('Requesting generation of API Docs')
      await getUtils().generateApiDocs(serviceSetup.apiDocsPath)
    }
    return apifiedApp
  } catch (err) {
    logger.error('Failed in bootstrapService %s ', err)
    throw err
  }
}

module.exports = {
  bootstrapService
}
