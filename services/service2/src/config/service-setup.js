const packageJson = require('./../../package.json')
const path = require('path')
const Joi = require('joi')
const processTestMessage = require('./../mq-processor-usage')

const dbConfig = require('./db-config')

const name = packageJson.name
const version = packageJson.version

const serviceSetup = {
  env: process.env.NODE_ENV,
  runIntegrationTests: process.env.RUN_INTEGRATION_TESTS,
  microserviceName: name,
  microserviceVersion: version,
  cache: {
    enabled: true,
    redisKey: process.env.REDIS_KEY,
    redisPort: process.env.REDIS_PORT,
    redisHost: process.env.REDIS_HOST,
    redisKeyPrefix: `${name}-${version}`,
    redisKeyTimeout: 24 * 60 * 60 // In Seconds
  },
  mq: {
    enabled: true,
    rabbitmqUser: process.env.RABBITMQ_USER,
    rabbitmqPwd: process.env.RABBITMQ_PWD,
    rabbitmqHost: process.env.RABBITMQ_HOST,
    rabbitmqPort: process.env.RABBITMQ_PORT,
    messageQueueHeartbeat: 60, // In seconds
    concurrencyLimitPerWorker: 0, // A value of zero means no-limit
    /* A value of true enforces a concurrency of 1 across workers.
    Set this to false if you have only one worker.
    Single worker scenario should be handled by setting concurrencyLimitPerWorker=1 if required
    */
    enforceConsecutiveFlow: false,
    exchangesToSubscribe: [
      {
        name: `${name}-${version}`,
        keys: [`notify-${name}`]
      }
    ]
  },
  trace: {
    enabled: true,
    transactionIdHeaderKey: 'x-transactionid',
    zipkinHost: process.env.ZIPKIN_HOST,
    zipkinPort: process.env.ZIPKIN_PORT
  },
  db: {
    enabled: true,
    modelsPath: path.join(__dirname, '../models'),
    config: dbConfig
  },
  api: {
    enabled: true,
    API_TIMEOUT: 60 * 1000 // In miliseconds
  },
  apiDocsPath: {
    postmanSpecPath: `${process.cwd()}/api-docs/postman/`,
    swaggerSpecPath: `${process.cwd()}/api-docs/swagger-specs/`
  },
  routes: {
    enabled: true,
    routeFolderPath: path.join(__dirname, '../routes')
  },
  serviceConfig: {
    TO_BE_SHARED: process.env.TO_BE_SHARED,
    X_NOT_TO_BE_SHARED: process.env.NOT_TO_BE_SHARED
  }
}

// Setup for MQ Listeners
const mqListeners = {
  TEST_MESSAGE: {
    specification: Joi.object().keys({
      event: Joi.string().min(1).required(),
      metadata: Joi.object().keys({
        appKey: Joi.string().min(1).required(),
        appContext: Joi.string().min(1).required()
      }),
      data: Joi.object().required()
    }),
    listener: processTestMessage
  }
}

module.exports = {
  serviceSetup,
  mqListeners
}
