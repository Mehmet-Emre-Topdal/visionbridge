const traverseAndApply = require('./traverseAndApply');

function processActionsFromTree(rootNodes) {
 
    rootNodes.forEach(rootNode => {
        if (rootNode.action.type !== 'remove') {
            traverseAndApply(rootNode);
        }
    });

    
    rootNodes.forEach(rootNode => {
        if (rootNode.action.type === 'remove') {
            traverseAndApply(rootNode);
        }
    });
}

module.exports = processActionsFromTree;