const { logger, errors } = require('@apifie/node-microservice')

async function processTestMessage (metadata, data, retryCount) {
  // Do your work here
  if (metadata.appKey === 'SoftErrorPass') {
    if (retryCount < 1) {
      logger.info('I am throwing soft error')
      throw new errors.SoftError('Sending SoftError', 2)
    } else {
      logger.info('I have processed test message after retry %j %j', metadata, data)
      return {
        result: 'ok',
        status: 200
      }
    }
  }
  if (metadata.appKey === 'SoftError') {
    if (retryCount < 1) {
      logger.info('I am throwing soft error')
      throw new errors.SoftError('Sending SoftError', 2)
    } else {
      logger.info('I am throwing hard error after %d retries', retryCount)
      throw new errors.HardError('Sending HardError', new Error('xxx'))
    }
  } else if (metadata.appKey === 'HardError') {
    logger.info('I am throwing hard error')
    throw new errors.HardError('Sending HardError', new Error('xxx'))
  } else if (metadata.appKey === 'FailureIncident') {
    logger.info('I am throwing incident')
    throw new errors.FailureIncident('Sending FailureIncident', new Error('yyy'), 5)
  } else if (metadata.appKey === 'TestPrefetch') {
    logger.info('I am processing test message %j %j', metadata, data)
    for (let i = 0; i < 2000000; i += 1) {
      logger.silly('Doing shit')
    }
    logger.info('I have processed test message %j %j', metadata, data)
    return {
      result: 'ok',
      status: 200
    }
  } else {
    logger.info('I have processed test message %j %j', metadata, data)
    return {
      result: 'ok',
      status: 200
    }
  }
}

module.exports = processTestMessage
