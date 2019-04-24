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

class StatisticBuilder extends Builder {
    build() {
        const container = this.createElement('div', [])
        const label = this.createElement('label', [{name:'for', value:this.field.id}])
        const input = this.createElement('input', this.field)
        container.append(label)
        container.append(input)
        return container
    }
}