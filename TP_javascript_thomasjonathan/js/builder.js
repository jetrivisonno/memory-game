class Builder {
    constructor(field) {
        this.field = field
    }
    createElement(tagName, attributes) {
        const element = document.createElement(tagName)
        for(const att in attributes) {
            element.setAttribute(attributes[att].name, attributes[att].value)
        }
        return element
    }
    createInputElement(tagName, attributes) {
        const element = this.createElement(tagName, attributes)
        element.setAttribute('id', this.field.id)
        element.setAttribute('type', this.field.type)
        element.setAttribute('name', this.field.id)
        element.setAttribute('value', this.field.value)
        return element
    }
}

class StatisticBuilder extends Builder {
    build() {
        const container = this.createElement('div', [])
        const label = this.createElement('label', [{name: 'for', value: this.field.id}])
        const input = this.createInputElement('input', [])
        label.textContent = this.field.label
        if(this.field.disabled) {
            input.setAttribute('disabled', '')
        }
        container.append(label)
        container.append(input)
        return container
    }
}

class CommandBuilder extends Builder {
    build() {
        const btn = this.createInputElement('input', [])
        btn.removeAttribute('name')
        return btn
    }
}

const jsonstatistics = [{
    id:'score',
    label:'score',
    type: 'number',
    value:0,
    disabled:true
},
{
    id:'timer',
    label:'timer',
    type: 'number',
    value:0,
    disabled:true
}]

const jsoncommandbtns = [{
    id:'game_loop',
    type:'submit',
    value:'start'
},
{
    id:'quit',
    type:'submit',
    value:'quit'
}]

for(const field in jsonstatistics) {
    const row = new StatisticBuilder(jsonstatistics[field])
    document.body.append(row.build())
}

for(const field in jsoncommandbtns) {
    const btn = new CommandBuilder(jsoncommandbtns[field])
    document.body.append(btn.build())
}