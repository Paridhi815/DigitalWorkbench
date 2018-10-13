const bp = require('@apifie/node-microservice')

async function saveToCache(key, value) {
  await bp.getCacheClient().setRedisKey(key, value)
}

async function readFromCache(key) {
  const val = await bp.getCacheClient().getRedisKey(key)
  return val
}

async function removeFromCache(key) {
  await bp.getCacheClient().deleteRedisKey(key)
}

module.exports = {
  saveToCache,
  readFromCache,
  removeFromCache
}
