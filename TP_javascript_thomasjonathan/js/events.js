const Events = (function () {
    let gameOn = false
    let gameLoop = false

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
        target.value = 'start game'
        // compare best time completion
        // store timer value in a variable and reset timer to 0
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
    // the timer function looks dirty!!!
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
    function attachEventListener (id, event, feature) {
        const element = document.getElementById(id)
        element.addEventListener(event, feature)
    }
    function detachEventListener (id, event, feature) {
        const element = document.getElementById(id)
        element.removeEventListener(event, feature)
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
