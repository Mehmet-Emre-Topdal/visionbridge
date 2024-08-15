function createQueues(actions){
    const alter = actions.filter(action => action.type === "alter");
    const insert = actions.filter(action => action.type == "insert");
    const remove = actions.filter(action => action.type === "remove");
    const replace = actions.filter(action => action.type == "replace");

    return {alter, insert, replace, remove}
}

module.exports = createQueues;