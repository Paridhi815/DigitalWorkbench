const Joi = require('joi')
const { logger, errors, getSqlDBClient } = require('@apifie/node-microservice')

const userObjectSchema = Joi.object().keys({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  email: Joi.string().min(1).required()
})

function validateUser(userObject) {
  const validationResult = Joi.validate(userObject, userObjectSchema, { abortEarly: false })
  if (validationResult.error) {
    logger.debug('User object violates schema rules \n%s\n%s', validationResult.error.message, JSON.stringify(userObject, null, 2))
    throw new errors.InvalidMessageContentError(`User schema validation failed [${validationResult.error.message}]`)
  }
}

function createAndValidateUserObject(firstName, lastName, email) {
  const userObject = {
    firstName,
    lastName,
    email
  }
  validateUser(userObject)
  return userObject
}

async function createUser(firstName, lastName, email) {
  const sqlDb = getSqlDBClient()
  try {
    const userObject = createAndValidateUserObject(firstName, lastName, email)
    logger.info('Creating new user record in database')
    const userDetails = await sqlDb.User.create(userObject);
    logger.info('Successfully created user record for %s in database', email)
    return userDetails.dataValues
  } catch (err) {
    logger.error('Received error while creating user record in database %j', err)
    throw err
  }
}

async function updateUser(firstName, lastName, email) {
  const sqlDb = getSqlDBClient();
  try {
    const userObject = createAndValidateUserObject(firstName, lastName, email)
    logger.info('Updating user record for %s in database', email)
    const res = await sqlDb.User.update({
      firstName: userObject.firstName,
      lastName: userObject.lastName
    }, {
      where: {
        email: userObject.email
      }
    })
    logger.info('Updated %d user records  for %s in database', res[0], email)
    return res[0]
  } catch (err) {
    logger.error('Received error while updating user record in database %j', err)
    throw err
  }
}

async function deleteUser(email) {
  const sqlDb = getSqlDBClient();
  try {
    logger.info('deleting user record for %s in database with given email id', email)
    const res = await sqlDb.User.destroy({
      where: {
        email
      }
    });
    logger.info('Deleted %d user records for %s in database', res, email)
    return res
  } catch (err) {
    logger.error('Received error while deleting user record in database %j', err)
    throw err
  }
}

async function getUser(email) {
  const sqlDb = getSqlDBClient();
  try {
    logger.info('fetching user details for %s from database', email)
    const userDetails = await sqlDb.User.findOne({
      attributes: ['firstName', 'lastName', 'email'],
      where: {
        email
      }
    });
    logger.info('Successfully fetched user details from database')
    return userDetails
  } catch (err) {
    logger.error('Received error while fetching user details %j', err)
    throw err
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser
}
