const Events = (function () {
    let gameOn = false
    let gameLoop = false
    let bestTime = 0
    let discovered = false
    let path = null

    function start (event) {
        detachEventListener('gameOn', 'click', start)
        attachEventListener('gameOn', 'click', stop)
        gameOn = true
        gameLoop = true
        const target = event.target
        target.value = 'end game'
        timer()
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
    function flip (event) {
        const target = event.target
        path = target.nextSibling.firstChild.src
        console.log(path)
        detachEventListener('cardWrapper', 'click', flip)
        detachEventListener('cardWrapper', 'click', compareCards)
        target.parentNode.parentNode.classList.toggle('flip')
        setTimeout(function () {
            if (discovered) {
                // keep cards discovered
            } else {
                // reset cards
            }
        }, 5000)
    }
    function compareCards (event) {
        const target = event.target
        if (path === target.src) {
            discovered = true
        } else {
            // reset cards
        }
        // check if there is any more cards to discover
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
    function attachEventListenerArray (id, event, feature) {
        const elementArray = document.getElementsByClassName(id)
        for (let i = 0; i < elementArray.length; i++) {
            elementArray[i].addEventListener(event, feature)
        }
    }
    return {
        init: function () {
            attachEventListener('quit', 'click', function () {
                window.close()
            })
            attachEventListener('gameOn', 'click', start)
            attachEventListener('gameLoop', 'click', pause)
            attachEventListenerArray('card', 'click', flip)
        }
    }
})()
