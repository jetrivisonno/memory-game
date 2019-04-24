const Markup = (function (){
    'use strict'
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
            input.disabled = true
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
    function wrapper() {
        const container = new Builder().createElement('div', [{name:'wrapper', value:'wrapper'}])
        return container
    }
    function frame() {
        const container = new Builder().createElement('div', [{name:'id', value:'gameOptionsWrapper'}])
        const statWrapper = new Builder().createElement('div', [{name:'id', value:'statWrapper'}])
        const btnWrapper = new Builder().createElement('div', [{name:'id', value:'btnWrapper'}])
        const cardWrapper = new Builder().createElement('div', [{name:'id', value:'cardWrapper'}])
        container.append(statWrapper)
        container.append(btnWrapper)
        container.append(cardWrapper)
        return container
    }
    function build(GAME) {
        const statWrapper = document.getElementById('statWrapper')
        const btnWrapper = document.getElementById('btnWrapper')
        for(const stat in GAME.statsFields) {
            const row = new StatisticBuilder(GAME.statsFields[stat])
            statWrapper.append(row.build())
        }
        for(const button in GAME.commandBtns) {
            const btn = new CommandBuilder(GAME.commandBtns[button])
            btnWrapper.append(btn.build())
        }
    }
    return {
        init: function(GAME) {
            const wrap = wrapper()
            const container = frame()
            wrap.append(container)
            document.body.append(wrap)
            build(GAME)
        }
    }
})()