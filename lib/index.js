const cmd = require('./utils/commands');
const template = require('../inputTemplate.json');

const Mustache = require('mustache');
const fs = require('fs');
const routeTemplate = require('../lib/templates/route');

const heading = Object.keys(template)[0];
const services = template[heading];

const cmdGet = (command) => {
  return new Promise(function (resolve, reject) {
    cmd.get(command,
      (err, data) => {
        err ? reject(err) : resolve(data);
      }
    );
  });
};

const makeServices = async (heading, services) => {
  let pwd = await cmdGet('pwd');
  pwd = pwd.trim();
  console.log(`DEBUG: 1 - Creating main folder: ${pwd}/${heading}`);
  await cmdGet(`mkdir -p ${pwd}/${heading}`);

  console.log('DEBUG: 2 - Creating all  services');

  for (let i = 0; i < services.length; i++) {
    let service = services[i];
    if (fs.existsSync(`${pwd}/${heading}/${Object.keys(service)[0]}`)) {
      console.log('Sevice Already Exists!!!!');
    } else {


      console.log(`DEBUG: 3 - Creating folder for service ${Object.keys(service)[0]}: ${pwd}/${heading}/${Object.keys(service)[0]}`);
      await cmdGet(`mkdir -p ${pwd}/${heading}/${Object.keys(service)[0]}`);
      console.log(`DEBUG: 4 - Creating basic boilerplate for the service ${Object.keys(service)[0]}`);
      console.log('DEBUG: 5 - Starting Copy ...');
      const eachMicroservice = `${pwd}/${heading}/${Object.keys(service)[0]}/`;

      await cmdGet(`cp -r ${pwd}/apifieSample/* ${eachMicroservice}`);
      console.log('DEBUG: 6 - eachMicroservice', eachMicroservice);

      console.log('DEBUG: 7 - Ending Copy ...');
      console.log('DEBUG: 8 - Installing Packages ...');

      await cmdGet(`cd ${eachMicroservice}  && npm install && cd ${pwd}`);
      console.log('DEBUG: 9 - Packages Installed ...');
      const models = service[`${Object.keys(service)[0]}`];

      const modelsList = Object.keys(models);
      for (let j = 0; j < modelsList.length; j++) {
        let model = modelsList[j];
        let modelPerService = Object.keys(models[model]);
        let modelDetails = Object.values(models[model]);
        console.log('DEBUG: 10 - model:', model);
        console.log('DEBUG: 11 - dt', models[model]);
        console.log('DEBUG: 12 - attributes', modelPerService);
        // models and migrations - using sequelize cli
        let vals = modelDetails.map(v => v['datatype']);
        console.log('DEBUG: 13 - values', vals);
        const stringAttributes = modelPerService.reduce((m, a, i) => `${m},${a}:${vals[i]}`, '');
        console.log(`DEBUG: 14 -cd ${eachMicroservice} && ${eachMicroservice}node_modules/.bin/sequelize model:generate --name ${model} --attributes ${stringAttributes} --models-path src/models && cd ${pwd}`);
        await cmdGet(`cd ${eachMicroservice} && ${eachMicroservice}node_modules/.bin/sequelize model:generate --name ${model} --attributes ${stringAttributes} --models-path ${eachMicroservice}src/models --migrations-path ${eachMicroservice}migrations --config ${eachMicroservice}src/config/db-config.js && cd ${pwd}`);

        // using mustache templating
        // routes 
        const view = {
          model: model,
          modelCap: model.charAt(0).toUpperCase() + model.slice(1)
        };
        const output = await Mustache.render(routeTemplate, view);
        fs.writeFileSync(`${eachMicroservice}src/routes/${model}-api.js`, output);
        // dao

        // service
      }
    }
  }
};

makeServices(heading, services).then(() => { process.exit(1); })
  .catch(e => console.log(e));
