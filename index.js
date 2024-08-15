const applyConfigurations = require('./applyConfigurations.js');
const readYAMLFile = require('./fileReader/readYAMLFile.js');

const datasourceConfig = readYAMLFile('./config/datasourceConfig.yaml');

applyConfigurations(datasourceConfig.datasource);
