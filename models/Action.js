// Action.js
class Action {
    constructor(type, selector = null, newElement = null, position = null, target = null, element = null, oldValue = null, newValue = null) {
        this.type = type;
        this.selector = selector;
        this.newElement = newElement;
        this.position = position;
        this.target = target;
        this.element = element;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }

    //todo: burası ayrı bir fonksiyona atılabilir single responsiblity açısından
    static fromYAML(yamlObj) {
        const actionsArray = [];
        yamlObj.actions.forEach(action => {
            actionsArray.push(new Action(
                action.type,
                action.selector,
                action.newElement,
                action.position,
                action.target,
                action.element,
                action.oldValue,
                action.newValue
            ));
        });
        return actionsArray;
    }
}

export default Action;
