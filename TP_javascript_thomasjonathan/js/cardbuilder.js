const CardCreator = (function () {
    'use strict'

    const PAIR = 2
    const NUMBER_OF_PAIRS = 9

    function createCardArray() {
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
        console.log(cardArray);
        
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
            t = cardArray[m];
            cardArray[m] = cardArray[i];
            cardArray[i] = t;
        }
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