function removeAction(action) {
    const elements = document.querySelectorAll(action.selector);
    
    if (elements.length === 0) {
        console.error("error from removeAction: no node found with this selector");
        return false;
    }

    elements.forEach(element => {
        element.remove();
    });

    return true;
}

module.exports = removeAction;