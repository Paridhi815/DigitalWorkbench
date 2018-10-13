const chai = require('chai')

const expect = chai.expect

require('./helpers/test-server')

const {
  saveToCache,
  readFromCache,
  removeFromCache
} = require('../../src/cache-usage')

describe('When we use Cache API', async () => {
  it('We can not get a value from cache without setting it', async() => {
    const val = await readFromCache('xxx')
    expect(val, 'we do not get any value before setting it').to.be.null
  })

  it('We can send a value to cache and read it back', async() => {
    await saveToCache('k1', 'v1')
    const val = await readFromCache('k1')
    expect(val, 'we get the same value that we set').to.equal('v1')
  })

  it('We can not read a valueing it from cache', async() => {
    await saveToCache('k1', 'v12')
    await removeFromCache('k1')
    const val = await readFromCache('k1')
    expect(val, 'we do get back any value after deletion').to.be.null
  })
})
