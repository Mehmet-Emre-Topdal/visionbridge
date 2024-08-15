const insertAction = require("./Actions/insertAction");
const removeAction = require("./Actions/removeAction");
const replaceAction = require("./Actions/replaceAction");
const alterAction = require("./Actions/alterAction");


function applyAction(action) {
    if (action.type === 'remove') {
        return removeAction(action);
    } else if (action.type === 'replace') {
        return replaceAction(action);
    } else if (action.type === 'insert') {
        return insertAction(action);
    } else if (action.type === 'alter') {
        return alterAction(action);
    } else {
        console.error("error from applyAction: unknown action type");
    }
}

module.exports = applyAction;