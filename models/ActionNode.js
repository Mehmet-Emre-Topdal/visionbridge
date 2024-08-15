class ActionNode {
    constructor(action) {
        this.action = action;
        this.children = [];
    }

    addChild(childNode) {
        this.children.push(childNode);
    }
}

module.exports = ActionNode;
