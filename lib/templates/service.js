module.exports = `const { logger,errors } = require('@apifie/node-microservice');
const dao = require('../dao/{{model}}-dao');

// TODO : Add JoI validators for request schema

async function create{{modelCap}}(req,res) {
  logger.info('Received request for creating {{model}}');
  try {
    const {{model}}Object = await dao.create{{modelCap}}(req.body);
    logger.info('Succesfully created {{model}} record');
    res.status(201).json({
      statusCode: 201,
      result: {{model}}Object
    });
  } catch (err) {
    logger.error('Received error while creating {{model}} record %j',err);
    if (err instanceof errors.InvalidMessageContentError) {
      return res.status(400).json({
        statusCode: 400,
        error: err.message
      });
    }
    return res.status(500).json({
      statusCode: 500,
      result: {
        msg: 'Received error while creating {{model}} record'
      }
    });
  }
}

async function update{{modelCap}}(req,res) {
  logger.info('Received request for updating {{model}} details for %s',req.params.id);
  try {
    const updatedCount = await dao.update{{modelCap}}(req.body,req.params.id);
    if (updatedCount > 0) {
      logger.info('Successfully updated {{model}} record for %s',req.params.id);
      res.status(200).json({
        statusCode: 200,
        result: {
          msg: 'Successfully updated {{model}} record'
        }
      });
    } else {
      logger.info('{{modelCap}} record not found for %s',req.params.id);
      res.status(204).json({
        statusCode: 204,
        result: {
          msg: '{{modelCap}} record not found'
        }
      });
    }
  } catch (err) {
    logger.error('Received error while updating {{model}} record %j',err,err);
    if (err instanceof errors.InvalidMessageContentError) {
      return res.status(400).json({
        statusCode: 400,
        error: err.message
      });
    }
    return res.status(500).json({
      statusCode: 500,
      result: {
        msg: 'Received error while updating {{model}} record'
      }
    });
  }
}

async function delete{{modelCap}}(req,res) {
  logger.info('Received request for deleting {{model}} for %s',req.params.id);
  try {
    const deletedCount = await dao.delete{{modelCap}}(req.params.id);
    if (deletedCount > 0) {
      logger.info('Successfully deleted {{model}} record for %s',req.params.id);
      res.status(200).json({
        statusCode: 200,
        result: {
          msg: 'Successfully deleted {{model}} record'
        }
      });
    } else {
      logger.info('{{modelCap}} record not found for %s',req.params.id);
      res.status(204).json({
        statusCode: 204,
        result: {
          msg: '{{modelCap}} record not found'
        }
      });
    }
  } catch (err) {
    logger.error('Received error while deleting {{model}} record %j',err);
    return res.status(500).json({
      statusCode: 500,
      result: {
        msg: 'Received error while deleting {{model}} record'
      }
    });
  }
}

async function get{{modelCap}}(req,res) {
  logger.info('Received request for fetching {{model}} details for %s',req.params.id);
  try {
    const {{model}}Object = await dao.get{{modelCap}}(req.params.id);
    if ({{model}}Object) {
      logger.info('Found {{model}} record for %s',req.params.id);
      res.status(200).json({
        statusCode: 200,
        result: {{model}}Object
      });
    } else {
      logger.info('{{modelCap}} record not found for %s',req.params.id);
      res.status(204).json({
        statusCode: 204,
        result: {
          msg: '{{modelCap}} record not found'
        }
      });
    }
  } catch (err) {
    logger.error('Received error while fetching {{model}} details %j',err);
    return res.status(500).json({
      statusCode: 500,
      result: {
        msg: 'Received error while fetching {{model}} details'
      }
    });
  }
}

async function get{{modelCap}}s(req,res) {
  logger.info('Received request for fetching all {{model}}s');
  try {
    const {{model}}Object = await dao.get{{modelCap}}s();
    if ({{model}}Object) {
      logger.info('Found {{model}}s');
      res.status(200).json({
        statusCode: 200,
        result: {{model}}Object
      });
    } else {
      logger.info('No {{modelCap}}s Exist');
      res.status(204).json({
        statusCode: 204,
        result: {
          msg: '{{modelCap}}s not found'
        }
      });
    }
  } catch (err) {
    logger.error('Received error while fetching {{model}}s',err);
    return res.status(500).json({
      statusCode: 500,
      result: {
        msg: 'Received error while fetching {{model}}s'
      }
    });
  }
}

module.exports = {
  create{{modelCap}},
  update{{modelCap}},
  delete{{modelCap}},
  get{{modelCap}},
  get{{modelCap}}s
};
`;
