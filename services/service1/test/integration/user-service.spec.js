const chai = require('chai')
const chaiHttp = require('chai-http');

const { logger } = require('@apifie/node-microservice')

const expect = chai.expect
chai.use(chaiHttp);

const { startService } = require('./helpers/test-server')

const {
  createUser,
  updateUser,
  deleteUser,
  getUser
} = require('../../src/service/user-service')

describe('When we use User Service REST API', async () => {
  let requester,
    app
  before(async () => {
    app = await startService()
    requester = chai.request(app).keepOpen()
  })

  after(async () => {
    await chai.request(app)
      .delete('/user/testemail')
    requester.close()
  })

  it('We can not create an invalid user record', async() => {
    const res = await chai.request(app)
      .post('/user')
      .send({ firstName: 'fname' })
    expect(res).to.have.status(400)
  })

  it('We can create a valid user record', async() => {
    const res = await chai.request(app)
      .post('/user')
      .send({ firstName: 'fname', lastName: 'lname', email: 'testemail' })
    expect(res).to.have.status(200)
  })

  it('We can not update a non-existent user record', async() => {
    const res = await chai.request(app)
      .put('/user/xxx')
      .send({ firstName: 'fname2', lastName: 'lname2' })
    expect(res).to.have.status(404)
  })

  it('We can update an existing user record', async() => {
    const res = await chai.request(app)
      .put('/user/testemail')
      .send({ firstName: 'fname2', lastName: 'lname2' })
    expect(res).to.have.status(200)
  })

  it('We can not update an existing user record with invalid data', async() => {
    const res = await chai.request(app)
      .put('/user/testemail')
      .send({ firstName: 'fname2', lastName: null })
    expect(res).to.have.status(400)
  })

  it('We can not delete a non-existent user record', async() => {
    const res = await chai.request(app)
      .delete('/user/xxx')
    expect(res).to.have.status(404)
  })

  it('We can delete an existing user record', async() => {
    const res = await chai.request(app)
      .delete('/user/testemail')
    expect(res).to.have.status(200)
  })

  it('We can not fetch a non-existent user record', async() => {
    const res = await chai.request(app)
      .get('/user/xxx')
    expect(res).to.have.status(404)
  })

  it('We can fetch an existing user record', async() => {
    await chai.request(app)
      .post('/user')
      .send({ firstName: 'fname', lastName: 'lname', email: 'testemail' })
    const res = await chai.request(app)
      .get('/user/testemail')
    expect(res).to.have.status(200)
  })
})
