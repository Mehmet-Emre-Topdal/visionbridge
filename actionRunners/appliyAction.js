function applyAction(action) {
    if (action.type === 'remove') {
        removeAction(action);
    } else if (action.type === 'replace') {
        replaceAction(action);
    } else if (action.type === 'insert') {
        insertAction(action);
    } else if (action.type === 'alter') {
        alterAction(action);
    } else {
        console.error("error from applyAction: unknown action type");
    }
}
