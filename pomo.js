'use strict'
class Pomo {
    constructor() {

    }
    startnStopCointainer() {
        if (time > -1) {
            if (going == false) {
                this.countdownActions()
                going = true
                this.startInterval()
            }
            if (event.target.innerHTML == 'Pause') {
                going = false
                this.stopInterval()
            } else {
                startButton.innerHTML = 'Pause'
            }
        }
    }
    startInterval() {
        if (time > -1) {
            this.id = setInterval(this.countdownActions, 1000)
        }
    }
    stopInterval() {
        clearInterval(this.id)
        pomo.zeroPause()
    }
    countdownActions() {
        if (time > -1) {
            pomo.zeroPause()
            let minutes = Math.floor(time / 60)
            let seconds = (time % 60).toLocaleString('es-US', {
                minimumIntegerDigits: 2
            })
            timeText.innerHTML = `${minutes}:${seconds}`
            time--
        }
    }
    zeroPause() {
        if (going == true) {
            startButton.innerHTML = 'Pause'
        }
        if (going == false) {
            startButton.innerHTML = 'Start'
        }
        if (time == 0) {
            clearInterval(this.id)
            startButton.innerHTML = 'Start'
            going = false
        }
    }
    reset() {
        time = startingMinutes * 60
        this.countdownActions()
    }
    timeSelect() {
        if (event.target == pomoButton) {
            startingMinutes = 45
            time = startingMinutes * 60
        }
        if (event.target == shortButton) {
            startingMinutes = 7
            time = startingMinutes * 60
        }
        if (event.target == longButton) {
            startingMinutes = 13
            time = startingMinutes * 60
        }
        going = false
        clearInterval(this.id)
        this.reset()
        this.colorChange(event.target)
    }
    colorChange() {
        background.classList = ['frame']
        let colorr
        if (event.target == pomoButton) {
            background.classList = ['frame']
            colorr = 'tomato'
        }
        if (event.target == shortButton) {
            background.classList.add('shortBackground')
            colorr = 'rgb(75, 177, 64)'
        }
        if (event.target == longButton) {
            background.classList.add('longBackground')
            colorr = 'rgb(64, 156, 177)'
        }
        allButtons.forEach((button) => {
            button.style.color = colorr
        })
    }
    doneTime() {
        let displayMin = Math.floor(time / 60) + today.getMinutes()
        let displayHour = today.getHours()
        if (displayMin > 59) {
            displayHour += 1
            displayMin -= 60
        }
        if (displayHour > 12) {
            displayHour -= 12
        }
        doneText.innerHTML = (`${displayHour}:${displayMin.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`)
    }
}
// top Buttons
const pomoButton = document.querySelector('[data-pomo]')
const shortButton = document.querySelector('[data-short]')
const longButton = document.querySelector('[data-long]')
// lower Buttons
const startButton = document.querySelector('[data-start]')
const resetButton = document.querySelector('[data-reset]')
// displays
const timeText = document.querySelector('[data-timer]')
const doneText = document.querySelector('[data-done')
// background and text coloring
const background = document.querySelector('.frame')
const allButtons = document.querySelectorAll('button')
// current time 
let today = new Date()
// countdown
let startingMinutes = 45
let time = startingMinutes * 60
let going = false
// class
const pomo = new Pomo()


startButton.addEventListener(('click'), () => {
    // pomo.reset()
    pomo.doneTime()
    pomo.startnStopCointainer()
})
resetButton.addEventListener(('click'), () => {
    pomo.reset()
})
pomoButton.addEventListener(('click'), () => {
    pomo.timeSelect()
    pomo.doneTime()
})
shortButton.addEventListener(('click'), () => {
    pomo.timeSelect()
    pomo.doneTime()
})
longButton.addEventListener(('click'), () => {
    pomo.timeSelect()
    pomo.doneTime()
})


//small bug with reset 
// when we reset while going will just continue countdown without stopping even if reset back to original time
// would like upon reset for button to go back to start and it be back to defualt ready to run again like original start would

//issue where i can add clear interval to the reset function and that works to stop it 
//  -- the trouble is getting the button back to start in text and functionnality

// sure there's a fairly easy fix
// also small bug also on the timer but because the start of time is directly linked to a button click well if you spam it fast 
// ---you can make it count down faster then intended aka faster then counting second by second



//aside from those two small bugs where the spam possible but unlikely for its use and the reset though could be annoyin or just nice to have not super big deal 
// all else work spot on as intended though i would say the my code done in object orientated manner is nice and fairly clean would say for only 2nd time building
//  -- in this structure time in class and such also did well
// there are 100% thing that could be improved in out logic there is definatly some reducdency though not crazy right but i know def a cleaner way and
//  also some var changes and params they work but aren't the best right but overall i'd say we did a bang up job overall on the project on to the next


// could adbance by fixing bugs and like to add a tracker for how many of each have been completed tally up our breaks of each of all pomo's completed
//  also add small togo list like below add your task working on ect.. 
//  add a sound when timer hits zero to alart and funz
// actually make it avalible only