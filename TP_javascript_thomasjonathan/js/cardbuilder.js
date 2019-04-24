const CardBuilder = (function () {
    'use strict'

    const PAIR = 2
    const CARDS = {
        id: 'cards-container',
        imageName: []
    }

    function getCardsContainer(CARDS) {
        return document.getElementById(CARDS.id)
    }

    function createCardArray(CARDS) {
        let cardArray = []

        for (let i = 0; i < CARDS.imageName.length; i++) {
            let counter = 0
            for (let k = 0; k < PAIR; k++) {
                let card = createElement('img')
                card.src = counter + '.jpg'
                cardArray[counter] = card
                counter++ 
            }
        }

        shuffleArray(cardArray)

        return cardArray
    }

    function shuffleArray(cardArray) {
        let m = cardArray.length
        let t
        let i
          
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
          
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
          
        return array;
    }

    function cardGenerator(CARDS) {
        const cardsContainer = getCardsContainer(CARDS)
        const cardArray = createCardArray(CARDS)

        for (let i = 0; i < cardArray.length; i++) {
            cardsContainer.appendChild(cardArray[i])
        }
    }

    return {
        init: function (CARDS) {
            cardGenerator(CARDS)
        }
    }
}
)()