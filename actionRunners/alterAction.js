function alterAction(action) {
    //createTreeWalker: a function that utilize DOM is a tree. We can traverse the dom with this function.
    //NodeFilter.SHOW_TEXT: a constant that tells the walker to only show text nodes.
    //null: no filters
    //false: ignore characters like &gt;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    let found = false;

    while (node = walker.nextNode()) {
        if (node.nodeValue.includes(action.oldValue)) {
            node.nodeValue = node.nodeValue.replace(new RegExp(action.oldValue, 'g'), action.newValue);
            found = true;
        }
    }

    if (!found) {
        console.error("error from alterAction: no text node found with the oldValue");
    }
}

module.exports = alterAction
