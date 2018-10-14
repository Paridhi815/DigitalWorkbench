const cmd = require('./utils/commands');
const template = require('../inputTemplate.json');
const logger = require('winston');
require('./utils/logger');

const Mustache = require('mustache');
const fs = require('fs');
const routeTemplate = require('../lib/templates/route');
const daoTemplate = require('../lib/templates/dao');
const serviceTemplate = require('../lib/templates/service');
const envTemplate = require('../lib/templates/env');
const packageJsonemplate = require('../lib/templates/packageJson');

const heading = Object.keys(template)[0];
const services = template[heading];

const cmdGet = (command) => {
  return new Promise(function (resolve,reject) {
    cmd.get(command,
      (err,data) => {
        err ? reject(err) : resolve(data);
      }
    );
  });
};

const makeServices = async (heading,services) => {
  try {
    let pwd = await cmdGet('pwd');
    pwd = pwd.trim();
    logger.info(`1 - Creating main folder: ${pwd}/${heading}`);
    await cmdGet(`mkdir -p ${pwd}/${heading}`);

    logger.info('2 - Creating all  services');

    for (let i = 0; i < services.length; i++) {
      let service = services[i];
      let serviceName = Object.keys(service)[0];
      if (fs.existsSync(`${pwd}/${heading}/${serviceName}`)) {
        logger.warn('Sevice Already Exists!!!!');
      } else {


        logger.info(`3 - Creating folder for service ${serviceName}: ${pwd}/${heading}/${serviceName}`);
        await cmdGet(`mkdir -p ${pwd}/${heading}/${serviceName}`);
        logger.info(`4 - Creating basic boilerplate for the service ${serviceName}`);
        logger.info('5 - Starting Copy ...');
        const eachMicroservice = `${pwd}/${heading}/${serviceName}/`;

        await cmdGet(`cp -r ${pwd}/apifieSample/* ${eachMicroservice}`);
        logger.info('7 - Ending Copy ...');


        const view = {
          serviceName: serviceName,
          version: service[serviceName]['version'],
          description: service[serviceName]['description'],
          author: service[serviceName]['author'],
          serviceNameCap: serviceName.charAt(0).toUpperCase() + serviceName.slice(1)
        };

        const packageJsonOutput = await Mustache.render(packageJsonemplate,view);
        fs.writeFileSync(`${eachMicroservice}package.json`,packageJsonOutput);

        const envOutput = await Mustache.render(envTemplate,view);
        fs.writeFileSync(`${eachMicroservice}.env`,envOutput);


        logger.info('8 - Installing Packages ...');
        await cmdGet(`cd ${eachMicroservice}  && npm install && cd ${pwd}`);
        logger.info('9 - Packages Installed ...');
        const models = service[`${serviceName}`]['models'];

        const modelsList = Object.keys(models);
        for (let j = 0; j < modelsList.length; j++) {
          let model = modelsList[j];
          let modelPerService = Object.keys(models[model]);
          let modelDetails = Object.values(models[model]);
          logger.info('10 - model:',model);
          logger.info('11 - dt',models[model]);
          logger.info('12 - attributes',modelPerService);
          // models and migrations - using sequelize cli
          let vals = modelDetails.map(v => v['datatype']);
          logger.info('13 - values',vals);
          const stringAttributes = modelPerService.reduce((m,a,i) => `${m},${a}:${vals[i]}`,'');
          logger.info(`14 -cd ${eachMicroservice} && ${eachMicroservice}node_modules/.bin/sequelize model:generate --name ${model} --attributes ${stringAttributes} --models-path src/models && cd ${pwd}`);
          await cmdGet(`cd ${eachMicroservice} && ${eachMicroservice}node_modules/.bin/sequelize model:generate --name ${model} --attributes ${stringAttributes} --models-path ${eachMicroservice}src/models --migrations-path ${eachMicroservice}migrations --config ${eachMicroservice}src/config/db-config.js && cd ${pwd}`);

          // using mustache templating
          // routes 
          const view = {
            model: model,
            modelCap: model.charAt(0).toUpperCase() + model.slice(1)
          };
          const routeOutput = await Mustache.render(routeTemplate,view);
          fs.writeFileSync(`${eachMicroservice}src/routes/${model}-api.js`,routeOutput);
          // dao
          const daoOutput = await Mustache.render(daoTemplate,view);
          fs.writeFileSync(`${eachMicroservice}src/dao/${model}-dao.js`,daoOutput);
          // service
          const serviceOutput = await Mustache.render(serviceTemplate,view);
          fs.writeFileSync(`${eachMicroservice}src/service/${model}-service.js`,serviceOutput);
        }
      }
    }
  }
  catch(e) {
    logger.error(`Something went wrong -${e}`);
  }
};

makeServices(heading,services).then(() => { process.exit(1); })
  .catch(e => logger.error(e));
