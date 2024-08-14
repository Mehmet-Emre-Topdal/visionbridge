const applyAction  = require("./actionRunners/applyAction");
const readYAMLFile = require("./fileReader/readYAMLFile");
const createQueues = require("./priority/createQueues");


const configData = readYAMLFile("./data/A.yaml");
const queues = createQueues(configData.actions)

queues.insert.forEach(action => applyAction(action));
queues.remove.forEach(action => applyAction(action));
queues.alter.forEach(action => applyAction(action));
queues.remove.forEach(action => applyAction(action));

