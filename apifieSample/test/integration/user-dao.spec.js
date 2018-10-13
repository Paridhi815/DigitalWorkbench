const chai = require('chai')
const { logger } = require('@apifie/node-microservice')

const expect = chai.expect

const {
  createUser,
  updateUser,
  deleteUser,
  getUser
} = require('../../src/dao/user-dao')

describe('When we use SQL DB API', async () => {
  afterEach(async () => {
    await deleteUser('testemail')
  })

  it('We can not create an invalid user record', async() => expect(createUser('fname', null, 'testemail')).to.eventually.be.rejected)

  it('We can create a valid user record', async() => expect(createUser('fname', 'lname', 'testemail')).to.eventually.be.fulfilled)

  it('We can not update a non-existent user record', async() => {
    const count = await updateUser('fname1', 'lname1', 'xxx')
    expect(count, 'no records are updated').to.equal(0)
  })

  it('We can update an existing user record', async() => {
    await createUser('fname', 'lname', 'testemail')
    const count = await updateUser('fname1', 'lname1', 'testemail')
    expect(count, 'records are updated').to.be.above(0)
  })

  it('We can not update an existing user record with invalid data', async() => {
    await createUser('fname', 'lname', 'testemail')
    return expect(updateUser('fname1', null, 'testemail')).to.eventually.be.rejected
  })

  it('We can not delete a non-existent user record', async() => {
    const count = await deleteUser('xxx')
    logger.info('hello ', count)
    expect(count, 'no records are updated').to.equal(0)
  })

  it('We can delete an existing user record', async() => {
    await createUser('fname', 'lname', 'testemail')
    const count = await deleteUser('testemail')
    expect(count, 'records are deleted').to.be.above(0)
  })

  it('We can not fetch a non-existent user record', async() => {
    const user = await getUser('xxx')
    expect(user, 'no records are found').to.be.null
  })

  it('We can fetch an existing user record', async() => {
    await createUser('fname', 'lname', 'testemail')
    const user = await getUser('testemail')
    expect(user.firstName, 'correct user is found').to.equal('fname')
    expect(user.email, 'correct user is found').to.equal('testemail')
  })
})
