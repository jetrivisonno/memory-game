// eslint-disable-next-line no-unused-vars
const Events = (function () {
    const MAX_CARDS_FLIPPED = 2
    const MAX_MATCHES = 8
    let gameOn = false
    let gameLoop = false
    let bestTime = 999999
    let discovered = false
    let pathFirstImg = null
    let flippedCards = 0
    let flipDiv1 = null
    let flipDiv2 = null
    let pairsMade = 0

    function start (event) {
        let cardWrapper = document.getElementById('cardWrapper')
        cardWrapper.style.display = 'grid'
        detachEventListener('gameOn', 'click', start)
        attachEventListener('gameOn', 'click', stop)
        attachEventListener('gameLoop', 'click', pause)
        gameOn = true
        gameLoop = true
        const target = event.target
        target.value = 'end game'
        clearDiv(cardWrapper)
        reset()
        let cards = new Cards()
        cards.cardGenerator()
        timer()
        attachEventListenerArray('card', 'click', flip)
    }
    function stop () {
        detachEventListener('gameOn', 'click', stop)
        attachEventListener('gameOn', 'click', start)
        removeEventListenerArray('card', 'click', flip)
        gameOn = false
        gameLoop = false
        const startBtn = document.getElementById('gameOn')
        const pauseBtn = document.getElementById('gameLoop')
        const completedIn = document.getElementById('timer').value
        startBtn.value = 'start game'
        pauseBtn.value = 'pause'
        if (pairsMade === MAX_MATCHES) {
            compareTime(completedIn)
            alert('You completed the game in ' + completedIn + ' seconds.')
        }
    }
    function pause (event) {
        if (gameOn && gameLoop) {
            detachEventListener('gameLoop', 'click', pause)
            attachEventListener('gameLoop', 'click', unpause)
            removeEventListenerArray('card', 'click', flip)
            gameLoop = false
            const target = event.target
            target.value = 'unpause'
        } else {
            alert("Can't pause the game in its current state")
        }
    }
    function unpause () {
        if (gameOn && !gameLoop) {
            detachEventListener('gameLoop', 'click', unpause)
            attachEventListener('gameLoop', 'click', pause)
            attachEventListenerArray('card', 'click', flip)
            gameLoop = true
            const target = event.target
            target.value = 'pause'
            timer()
        }
    }
    function timer () {
        if (gameLoop) {
            setTimeout(function () {
                if (gameLoop) {
                    const timer = document.getElementById('timer')
                    timer.value++
                }
                timer()
            }, 1000)
        }
    }
    function flipToggle (element) {
        element.classList.toggle('flip')
    }
    function flip (event) {
        const target = event.target
        flippedCards++
        if (flippedCards < MAX_CARDS_FLIPPED) {
            flipDiv1 = target.parentNode.parentNode
            flipToggle(flipDiv1)
            flipDiv1.removeEventListener('click', flip)
            pathFirstImg = target.nextSibling.firstChild.src
        } else {
            flipDiv2 = target.parentNode.parentNode
            flipToggle(flipDiv2)
            removeEventListenerArray('card', 'click', flip)
            compareCards(event)
            flippedCards = 0
        }

        if (discovered) {
            // keep cards discovered
            discovered = false
            increasePair()
            if (pairsMade === MAX_MATCHES) {
                // win game functionality
                stop()
            }
        }
    }
    function compareCards (event) {
        const target = event.target
        increaseTries()
        if (pathFirstImg === target.nextSibling.firstChild.src) {
            discovered = true
            flipDiv1.classList.add('discovered')
            flipDiv2.classList.add('discovered')
            attachEventListenerArray('card', 'click', flip)
        } else {
            setTimeout(function () {
                flipToggle(flipDiv1)
                flipToggle(flipDiv2)
                attachEventListenerArray('card', 'click', flip)
            }, 1000)
        }
    }
    function increaseTries () {
        const triesInput = document.getElementById('tries')
        triesInput.value++
    }
    function resetPairs () {
        const pairsInput = document.getElementById('pairs')
        pairsMade = 0
        pairsInput.value = pairsMade
    }
    function increasePair () {
        const pairCounter = document.getElementById('pairs')
        pairsMade++
        pairCounter.value = pairsMade
    }
    function compareTime (time) {
        if (time < bestTime) {
            bestTime = time
            const element = document.getElementById('bestTime')
            element.value = bestTime
            alert('Your time of ' + bestTime + 'seconds is the new best!')
        }
    }
    function reset () {
        const timer = document.getElementById('timer')
        const tries = document.getElementById('tries')
        timer.value = 0
        tries.value = 0
        resetPairs()
        pathFirstImg = null
        flippedCards = 0
        flipDiv1 = ''
        flipDiv2 = ''
    }
    function attachEventListener (id, event, feature) {
        const element = document.getElementById(id)
        element.addEventListener(event, feature)
    }
    function detachEventListener (id, event, feature) {
        const element = document.getElementById(id)
        element.removeEventListener(event, feature)
    }
    function attachEventListenerArray (reference, event, feature) {
        const elementArray = document.getElementsByClassName(reference)
        for (let i = 0; i < elementArray.length; i++) {
            if (!elementArray[i].classList.contains('discovered')) {
                elementArray[i].addEventListener(event, feature)
            }
        }
    }
    function removeEventListenerArray (reference, event, feature) {
        const elementArray = document.getElementsByClassName(reference)
        for (let i = 0; i < elementArray.length; i++) {
            elementArray[i].removeEventListener(event, feature)
        }
    }

    function clearDiv (div) {
        div.innerHTML = ''
    }

    class Cards {
        shuffleArray (cardArray) {
            let m = cardArray.length
            let t
            let i

            // While there remain elements to shuffle…
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--)

                // And swap it with the current element.
                t = cardArray[m]
                cardArray[m] = cardArray[i]
                cardArray[i] = t
            }
        }

        createCardArray () {
            const PAIR = 2
            const NUMBER_OF_PAIRS = 8

            let cardArray = []

            for (let i = 0; i < NUMBER_OF_PAIRS; i++) {
                for (let k = 0; k < PAIR; k++) {
                    const cardContainer = document.createElement('div')
                    const cardFlipper = document.createElement('div')
                    const cardFront = document.createElement('div')
                    const cardBack = document.createElement('div')
                    const cardImg = document.createElement('img')

                    cardImg.src = 'images/' + i + '.jpeg'

                    cardContainer.classList.add('card')
                    cardFlipper.classList.add('flipper')
                    cardFront.classList.add('front')
                    cardBack.classList.add('back')

                    cardBack.append(cardImg)
                    cardFlipper.append(cardFront)
                    cardFlipper.append(cardBack)
                    cardContainer.append(cardFlipper)

                    cardArray.push(cardContainer)
                }
            }

            this.shuffleArray(cardArray)

            return cardArray
        }

        cardGenerator () {
            const cardsContainer = document.getElementById('cardWrapper')
            const cardArray = this.createCardArray()

            for (let i = 0; i < cardArray.length; i++) {
                cardsContainer.appendChild(cardArray[i])
            }
        }
    }

    return {
        init: function () {
            attachEventListener('quit', 'click', function () {
                window.close()
            })
            attachEventListener('gameOn', 'click', start)
            attachEventListener('gameLoop', 'click', pause)
        }
    }
})()
