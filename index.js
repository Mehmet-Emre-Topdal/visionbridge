
const  createDependencyTree  = require('./priority/createDependencyTree.js');
const  readYAMLFile  = require('./fileReader/readYAMLFile.js');
const  createQueues  = require('./priority/createQueues.js');
const processActionsFromTree  = require('./actionRunners/processActionsFromTree.js');

const configData = readYAMLFile('./data/A.yaml');
const queues = createQueues(configData.actions);
const dependencyTree = createDependencyTree(queues);

processActionsFromTree(dependencyTree);

