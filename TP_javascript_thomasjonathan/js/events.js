const Events = (function () {
    let gameLoop = false

    function start () {
        detachEventListener('gameLoop', 'click', start)
        attachEventListener('gameLoop', 'click', stop)
        gameLoop = true
        timer()
    }
    function stop () {
        detachEventListener('gameLoop', 'click', stop)
        attachEventListener('gameLoop', 'click', start)
        gameLoop = false
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
