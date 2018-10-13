const { logger, errors } = require('@apifie/node-microservice')
const dao = require('../dao/user-dao')

// TODO : Add JoI validators for request schema

async function createUser(req, res) {
  logger.info('Received request for creating user')
  try {
    const userObject = await dao.createUser(req.body.firstName, req.body.lastName, req.body.email)
    logger.info('Succesfully created user record')
    res.status(200).json({
      statusCode: 200,
      result: userObject
    })
  } catch (err) {
    logger.error('Received error while creating user record %j', err)
    if (err instanceof errors.InvalidMessageContentError) {
      return res.status(400).json({
        statusCode: 400,
        error: err.message
      })
    }
    return res.status(500).json({
      statusCode: 500,
      result: {
        msg: 'Received error while creating user record'
      }
    })
  }
}

async function updateUser(req, res) {
  logger.info('Received request for updating user details for %s', req.params.email)
  try {
    const updatedCount = await dao.updateUser(req.body.firstName, req.body.lastName, req.params.email)
    if (updatedCount > 0) {
      logger.info('Successfully updated user record for %s', req.params.email)
      res.status(200).json({
        statusCode: 200,
        result: {
          msg: 'Successfully updated user record'
        }
      })
    } else {
      logger.info('User record not found for %s', req.params.email)
      res.status(404).json({
        statusCode: 404,
        result: {
          msg: 'User record not found'
        }
      })
    }
  } catch (err) {
    logger.error('Received error while updating user record %j', err, err)
    if (err instanceof errors.InvalidMessageContentError) {
      return res.status(400).json({
        statusCode: 400,
        error: err.message
      })
    }
    return res.status(500).json({
      statusCode: 500,
      result: {
        msg: 'Received error while updating user record'
      }
    })
  }
}

async function deleteUser(req, res) {
  logger.info('Received request for deleting user for %s', req.params.email)
  try {
    const deletedCount = await dao.deleteUser(req.params.email)
    if (deletedCount > 0) {
      logger.info('Successfully deleted user record for %s', req.params.email)
      res.status(200).json({
        statusCode: 200,
        result: {
          msg: 'Successfully deleted user record'
        }
      })
    } else {
      logger.info('User record not found for %s', req.params.email)
      res.status(404).json({
        statusCode: 404,
        result: {
          msg: 'User record not found'
        }
      })
    }
  } catch (err) {
    logger.error('Received error while deleting user record %j', err)
    return res.status(500).json({
      statusCode: 500,
      result: {
        msg: 'Received error while deleting user record'
      }
    })
  }
}

async function getUser(req, res) {
  logger.info('Received request for fetching user details for %s', req.params.email)
  try {
    const userObject = await dao.getUser(req.params.email)
    if (userObject) {
      logger.info('Found user record for %s', req.params.email)
      res.status(200).json({
        statusCode: 200,
        result: userObject
      })
    } else {
      logger.info('User record not found for %s', req.params.email)
      res.status(404).json({
        statusCode: 404,
        result: {
          msg: 'User record not found'
        }
      })
    }
  } catch (err) {
    logger.error('Received error while fetching user details %j', err)
    return res.status(500).json({
      statusCode: 500,
      result: {
        msg: 'Received error while fetching user details'
      }
    })
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser
}
