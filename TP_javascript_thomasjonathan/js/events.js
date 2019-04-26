const Events = (function () {
    const MAX_CARDS_FLIPPED = 2
    const MAX_MATCHES = 9
    let gameOn = false
    let gameLoop = false
    let bestTime = 0
    let discovered = false
    let pathFirstImg = null
    let flippedCards = 0
    let flipDiv1 = null
    let flipDiv2 = null
    let pairsMade = 0

    function start (event) {
        detachEventListener('gameOn', 'click', start)
        attachEventListener('gameOn', 'click', stop)
        gameOn = true
        gameLoop = true
        const target = event.target
        target.value = 'end game'
        timer()
        attachEventListenerArray('card', 'click', flip)
    }
    function stop (event) {
        detachEventListener('gameOn', 'click', stop)
        attachEventListener('gameOn', 'click', start)
        gameOn = false
        gameLoop = false
        const target = event.target
        const pauseBtn = document.getElementById('gameLoop')
        const completedIn = document.getElementById('timer').value
        target.value = 'start game'
        pauseBtn.value = 'pause game'
        reset()
        compareTime(completedIn)
        alert('You completed the game in ' + completedIn + ' seconds')
    }
    function pause (event) {
        if (gameOn && gameLoop) {
            detachEventListener('gameLoop', 'click', pause)
            attachEventListener('gameLoop', 'click', unpause)
            gameLoop = false
            const target = event.target
            target.value = 'unpause game'
        } else {
            alert("Can't pause the game in its current state")
        }
    }
    function unpause () {
        if (gameOn && !gameLoop) {
            detachEventListener('gameLoop', 'click', unpause)
            attachEventListener('gameLoop', 'click', pause)
            gameLoop = true
            const target = event.target
            target.value = 'pause game'
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
            }
        }
    }
    function compareCards (event) {
        const target = event.target
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
            }, 2000)
        }
        // check if there is any more cards to discover
    }
    function increasePair () {
        const pairCounter = document.getElementById('pairs')
        pairsMade++
        pairCounter.value = pairsMade
    }
    function compareTime (time) {
        if (time > bestTime) {
            bestTime = time
            const element = document.getElementById('bestTime')
            element.value = time
        }
    }
    function reset () {
        const timer = document.getElementById('timer')
        const tries = document.getElementById('tries')
        timer.value = 0
        tries.value = 0
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
