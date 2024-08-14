function removeAction(action) {
    const elements = document.querySelectorAll(action.selector);
    
    if (elements.length === 0) {
        console.error("error from removeAction: no node found with this selector");
        return;
    }

    elements.forEach(element => {
        element.remove();
    });
}

module.exports = removeAction;