const applyAction = require('./applyAction');

function traverseAndApply(node) {
    const result = applyAction(node.action);

    if (result) {
        node.children.forEach(childNode => {
            traverseAndApply(childNode);
        });
    }
}

module.exports = traverseAndApply;