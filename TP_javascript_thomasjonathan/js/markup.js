const Markup = (function () {
    'use strict'
    class Builder {
        constructor (field) {
            this.field = field
        }
        createElement (tagName, attributes) {
            const element = document.createElement(tagName)
            for (const att in attributes) {
                element.setAttribute(attributes[att].name, attributes[att].value)
            }
            return element
        }
        createInputElement (tagName, attributes) {
            const element = this.createElement(tagName, attributes)
            element.setAttribute('id', this.field.id)
            element.setAttribute('type', this.field.type)
            element.setAttribute('name', this.field.id)
            element.setAttribute('value', this.field.value)
            return element
        }
    }
    class StatisticBuilder extends Builder {
        build () {
            const container = this.createElement('div', [])
            const label = this.createElement('label', [{ name: 'for', value: this.field.id }])
            const input = this.createInputElement('input', [])
            label.textContent = this.field.label
            input.disabled = true
            container.append(label)
            container.append(input)
            return container
        }
    }
    class CommandBuilder extends Builder {
        build () {
            const btn = this.createInputElement('input', [])
            btn.removeAttribute('name')
            return btn
        }
    }
    function wrapper () {
        const container = new Builder().createElement('div', [{ name: 'wrapper', value: 'wrapper' }])
        return container
    }
    function frame () {
        const container = new Builder().createElement('div', [{ name: 'id', value: 'gameOptionsWrapper' }])
        const statWrapper = new Builder().createElement('div', [{ name: 'id', value: 'statWrapper' }])
        const btnWrapper = new Builder().createElement('div', [{ name: 'id', value: 'btnWrapper' }])
        const cardWrapper = new Builder().createElement('div', [{ name: 'id', value: 'cardWrapper' }])
        container.append(statWrapper)
        container.append(btnWrapper)
        return container
    }
    function build (GAME) {
        const statWrapper = document.getElementById('statWrapper')
        const btnWrapper = document.getElementById('btnWrapper')
        for (const stat in GAME.statsFields) {
            const row = new StatisticBuilder(GAME.statsFields[stat])
            statWrapper.append(row.build())
        }
        for (const button in GAME.commandBtns) {
            const btn = new CommandBuilder(GAME.commandBtns[button])
            btnWrapper.append(btn.build())
        }
    }

    class Card {
        const PAIR = 2
        const NUMBER_OF_PAIRS = 9

     createCardArray() {
        let cardArray = []

        for (let i = 0; i < NUMBER_OF_PAIRS; i++) {
            for (let k = 0; k < PAIR; k++) {
                let cardDiv = document.createElement('div')
                let cardImg = document.createElement('img')

                cardImg.src = 'images/' + i + '.jpeg'

                cardDiv.appendChild(cardImg)
                cardDiv.classList.add('card')
                cardArray.push(cardDiv)
            }
        }

        shuffleArray(cardArray)

        return cardArray
    }

     shuffleArray(cardArray) {
        let m = cardArray.length
        let t
        let i

        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = cardArray[m];
            cardArray[m] = cardArray[i];
            cardArray[i] = t;
        }
    }

     cardGenerator() {
        const cardsContainer = document.getElementById('cardWrapper')
        const cardArray = createCardArray()

        for (let i = 0; i < cardArray.length; i++) {
            cardsContainer.appendChild(cardArray[i])
        }
    }
    }

    return {
        init: function (GAME) {
            const wrap = wrapper()
            const container = frame()
            wrap.append(container)
            document.body.append(wrap)
            Card.cardGenerator()
            build(GAME)
        }
    }
})()
