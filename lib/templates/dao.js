module.exports = `const { logger, getSqlDBClient } = require('@apifie/node-microservice');

async function create{{modelCap}}({{model}}) {
  const sqlDb = getSqlDBClient();
  try {
    const {{model}}Details = await sqlDb.{{model}}.create({{model}});
    logger.info('Successfully created {{model}} record for %s in database', {{model}}.email);
    return {{model}}Details.dataValues;
  } catch (err) {
    logger.error('Received error while creating {{model}} record in database %j', err);
    throw err;
  }
}

async function update{{modelCap}}({{model}}, id) {
  const sqlDb = getSqlDBClient();
  try {
    logger.info('Updating {{model}} record for %s in database', {{model}}.id);
    const res = await sqlDb.{{model}}.update({{model}}, {
      where: {
        id
      }
    });
    logger.info('Updated %d {{model}} records  for %s in database', res[0], {{model}}.email);
    return res[0];
  } catch (err) {
    logger.error('Received error while updating {{model}} record in database %j', err);
    throw err;
  }
}

async function delete{{modelCap}}(id) {
  const sqlDb = getSqlDBClient();
  try {
    logger.info('deleting {{model}} record for id %s in database', id);
    const res = await sqlDb.{{model}}.destroy({
      where: {
        id
      }
    });
    logger.info('Deleted %d {{model}} records for %s in database', res, id);
    return res;
  } catch (err) {
    logger.error('Received error while deleting {{model}} record in database %j', err);
    throw err;
  }
}

async function get{{modelCap}}(id) {
  const sqlDb = getSqlDBClient();
  try {
    logger.info('fetching {{model}} details for %s from database', id);
    const {{model}}Details = await sqlDb.{{model}}.findOne({
      where: {
        id
      }
    });
    logger.info('Successfully fetched {{model}} details from database');
    return {{model}}Details;
  } catch (err) {
    logger.error('Received error while fetching {{model}} details %j', err);
    throw err;
  }
}

async function get{{modelCap}}s() {
  const sqlDb = getSqlDBClient();
  try {
    logger.info('fetching all {{model}}s details from database');
    const {{model}}Details = await sqlDb.{{model}}.findAll();
    logger.info('Successfully fetched all {{model}}s from database');
    return {{model}}Details;
  } catch (err) {
    logger.error('Received error while fetching {{model}} details %j', err);
    throw err;
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
