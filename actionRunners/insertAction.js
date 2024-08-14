function insertAction(action) {
    const targetElements = document.querySelectorAll(action.target);
    
    if (targetElements.length === 0) {
        console.error("error from insertAction: no node found with this selector");
        return;
    }

    targetElements.forEach(target => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = action.element;
        const newEl = tempDiv.firstChild;

        if (action.position === 'before') {
            target.parentNode.insertBefore(newEl, target);
        } else if (action.position === 'after') {
            target.parentNode.insertBefore(newEl, target.nextSibling);
        } else if (action.position === 'inside') {
            target.appendChild(newEl);
        } else {
            console.error("error from insertAction: unknown insert position");
        }
    });
}

module.exports = insertAction;