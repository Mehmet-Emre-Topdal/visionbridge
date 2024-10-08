function replaceAction(action) {
    const elements = document.querySelectorAll(action.selector);
    
    if (elements.length === 0) {
        console.error("error from replaceAction: no node found with this selector");
        return false;
    }

    elements.forEach(element => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = action.newElement;
        const newEl = tempDiv.firstChild;
        element.replaceWith(newEl);
    });

    return true;
}

module.exports = replaceAction;