const cmd = require('node-cmd');
const template = require('../inputTemplate.json');
const sleep = require('await-sleep');

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
  console.log(`1 - Creating main folder: ${pwd}/${heading}`);
  cmd.run(`mkdir ${pwd}/${heading}`);

  console.log('2 - Creating all  services');

  for (let i = 0; i < services.length; i++) {
    let service = services[i];

    console.log(`3 - Creating folder for service ${Object.keys(service)[0]}: ${pwd}/${heading}/${Object.keys(service)[0]}`);
    cmd.run(`mkdir ${pwd}/${heading}/${Object.keys(service)[0]}`);
    console.log(`4 - Creating basic boilerplate for the service ${Object.keys(service)[0]}`);
    console.log('5 - Starting Copy ...');
    const eachMicroservice = `${pwd}/${heading}/${Object.keys(service)[0]}/`;

    await runCopy(`${pwd}/boilerplate/*`, eachMicroservice);
    console.log('6 - eachMicroservice', eachMicroservice);

    console.log('7 - Ending Copy ...');
    console.log('8 - Installing Packages ...');

    await installPackages(`${pwd}`, eachMicroservice);
    console.log('9 - Packages Installed ...');
    const models = service[`${Object.keys(service)[0]}`];

    const modelsList = Object.keys(models);
    for (let j = 0; j < modelsList.length; j++) {
      let model = modelsList[j];
      let modelPerService = Object.keys(models[model]);
      let modelDetails = Object.values(models[model]);
      console.log('10 - model:', model);
      console.log('11 - dt', models[model]);
      console.log('12 - attributes', modelPerService);
      let vals = modelDetails.map(v => v['datatype']);
      console.log('13 - values', vals);
      console.log(modelPerService.reduce((m,a,i) => `${m} ${a}:${vals[i]} `, ''));
      const stringAttributes = modelPerService.reduce((m,a,i) => `${m} ${a}:${vals[i]} `, '');
      console.log(`14 -cd ${eachMicroservice} && ${eachMicroservice}node_modules/.bin/sequelize model:generate --name ${model} --attributes ${stringAttributes} --models-path src/models && cd ${pwd}`);
      //await sleep(1000);
      checkIfRunningss(`cd ${eachMicroservice}`);
      checkIfRunningss(`${eachMicroservice}node_modules/.bin/sequelize model:generate --name ${model} --attributes ${stringAttributes} --models-path src/models`);
      checkIfRunningss(`cd ${pwd}`);
    }
  }
};

const checkIfRunningss = async (command) =>{
  cmd.run(command);
  await sleep(1000);
};

const runCopy = async (src, dest) => {
  cmd.run(`cp -r ${src} ${dest}`);
  await sleep(1000);
};

const installPackages = async (src, dest) => {
  cmd.run(`cd ${dest} && npm install && cd ${src}`);
  //await sleep(1000);
};

makeServices(heading, services).then(() => { process.exit(1); })
  .catch(e => console.log(e));



