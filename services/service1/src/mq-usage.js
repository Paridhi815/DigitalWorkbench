const bp = require('@apifie/node-microservice')

async function sendRequest(exchange, routingKey) {
  // API : sendRequest (exchange, routingKey, event, metadata, data)
  const result = await bp.getMqClient().sendRequest(exchange, routingKey, 'yyy', { meta: 'data' }, { da: 'ta' })
  return result
}

async function sendResponse(exchange, routingKey) {
  // API : sendResponse (exchange, routingKey, event, metadata, data, isTargeted)
  const result = await bp.getMqClient().sendResponse(exchange, routingKey, 'yyy', { meta: 'data' }, { da: 'ta' }, false)
  return result
}

async function sendRetryRequest(msg) {
  // API : sendRetryRequest (msg, retryCount, delay)
  const result = await bp.getMqClient().sendRetryRequest(msg, 1, 5000)
  return result
}

async function sendIncident(msg, message) {
  // API : ssendIncident (msg, message, retryCount, error)
  const result = await bp.getMqClient().sendIncident(msg, message, 1, new Error('test error'))
  return result
}

module.exports = {
  sendRequest,
  sendResponse,
  sendRetryRequest,
  sendIncident
}
