
function isDependent(childAction, parentAction) {
    if (parentAction.type === 'replace') {
        if (childAction.type === 'insert' || childAction.type === 'alter') {
            if (childAction.target === parentAction.selector || childAction.selector === parentAction.selector) {
                return true;
            }
        }
    }

    if (parentAction.type === 'insert') {
        if (childAction.type === 'alter') {
            if (childAction.selector === parentAction.target || childAction.selector === parentAction.element) {
                return true;
            }
        }
    }

    if (parentAction.type === 'alter') {
        if (childAction.type === 'alter') {
            if (childAction.oldValue === parentAction.newValue || childAction.selector === parentAction.selector) {
                return true;
            }
        }
    }

    return false;
}

module.exports = isDependent;
