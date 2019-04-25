const Events = (function () {
    let gameOn = false
    let gameLoop = false

    function start () {
        detachEventListener('gameLoop', 'click', start)
        attachEventListener('gameLoop', 'click', pause)
        gameOn = true
        gameLoop = true
        timer()
    }
    function pause () {
        detachEventListener('gameLoop', 'click', pause)
        attachEventListener('gameLoop', 'click', start)
        gameLoop = false
    }
    function stop () {
        detachEventListener('gameLoop', 'click', stop)
        detachEventListener('gameLoop', 'click', pause)
        attachEventListener('gameLoop', 'click', start)
        gameOn = false
        gameLoop = false
        // compare best time completion
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
            attachEventListener('gameLoop', 'click', start)
        }
    }
})()
