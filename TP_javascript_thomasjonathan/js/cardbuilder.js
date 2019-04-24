const CardBuilder = (function () {
    'use strict'

    const PAIR = 2
    const NUMBER_OF_PAIRS = 9

    function createCardArray() {
        let cardArray = []

        for (let i = 0; i < NUMBER_OF_PAIRS; i++) {
            let counter = 0
            for (let k = 0; k < PAIR; k++) {
                let cardDiv = createElement('div')
                let cardImg = createElement('img')

                cardImg.src = '../images/' + i + '.jpeg'
                
                cardDiv.appendChild(cardImg)
                cardDiv.classList.add('card')
                cardArray.push(cardDiv)
                
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

    function cardGenerator() {
        const cardsContainer = document.getElementById('cardWrapper')
        const cardArray = createCardArray()

        for (let i = 0; i < cardArray.length; i++) {
            cardsContainer.appendChild(cardArray[i])
        }
    }

    return {
        init: function () {
            cardGenerator()
        }
    }
}
)()