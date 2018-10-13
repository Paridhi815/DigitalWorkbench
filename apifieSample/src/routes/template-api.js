// const { swagger } = require('./index.js')
// use this swagger instance if u want to add the schema, parameter, and references

const {
  createUser, updateUser, deleteUser, getUser
} = require('../service/user-service')

module.exports = [{
  path: '/user/:email',
  method: 'get',
  handler: getUser,
  config: {
    tags: ['User'],
    responses: {
      200: {
        description: 'Find an existing User based on email'
      }
    }
  }
}, {
  path: '/user',
  method: 'post',
  handler: createUser,
  config: {
    tags: ['User'],
    responses: {
      200: {
        description: 'Creates a new User'
      }
    }
  }
}, {
  path: '/user/:email',
  method: 'delete',
  handler: deleteUser,
  config: {
    tags: ['User'],
    responses: {
      200: {
        description: 'Delete an existing User based on email1'
      }
    }
  }
}, {
  path: '/user/:email',
  method: 'put',
  handler: updateUser,
  config: {
    tags: ['User'],
    responses: {
      200: {
        description: 'Update an existing User based on email'
      }
    }
  }
}]
