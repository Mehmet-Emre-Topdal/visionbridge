const ActionNode = require('../models/ActionNode');
const isDependent = require('./isDependent');

function createDependencyTree(queues) {
    const rootNodes = [];
    const allActions = [...queues.replace, ...queues.insert, ...queues.alter, ...queues.remove];

    allActions.forEach(action => {
        const actionNode = new ActionNode(action);

        allActions.forEach(otherAction => {
            if (isDependent(otherAction, action)) {
                const dependentNode = new ActionNode(otherAction);
                actionNode.addChild(dependentNode);
            }
        });

        rootNodes.push(actionNode);
    });

    return rootNodes;
}

module.exports = createDependencyTree;