class Builder {
    constructor(field) {
        this.field = field
    }
    createElement(tagName, attributes) {
        const element = document.createElement(tagName)
        attributes.forEach(function(attribute){
            element.setAttribute(attribute.name, attribute.value)
        })
        return element
    }
}