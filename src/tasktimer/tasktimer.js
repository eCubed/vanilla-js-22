import { setupCountdown } from './countdown.js'

const STARTING_TIME_S = 10

const NUM_CLICKS_GOAL = 20
let numClicks = 0
let userIsBeingTimed = false

const countdown = setupCountdown(STARTING_TIME_S, 
  (remainingTime) => {
    document.getElementById('timer-display').innerText = remainingTime
  },
  () => numClicks < NUM_CLICKS_GOAL,
  () => {
    alert(`Sorry, you didn't accomplish the task`)
    userIsBeingTimed = false
    numClicks = 0
    updateDisplay()
  })


const updateDisplay = () => {
  document.getElementById('click-area').innerText =  numClicks
  const timerDisplay = document.getElementById('timer-display')
  timerDisplay.style.display = userIsBeingTimed ? 'block' : 'none'
}

const checkTaskAccomplished = () => {
  if (numClicks === NUM_CLICKS_GOAL) {
    alert('Job done')
    document.getElementById('click-area').removeEventListener('click', onClick)
    userIsBeingTimed = false;
    numClicks = 0
    countdown.stopCountdown();
    initializeApp()
  }
}

const onClick = () => {
  numClicks++;
  if (numClicks === 1) {
    countdown.runCountdown()
    userIsBeingTimed = true
  }

  updateDisplay()
  checkTaskAccomplished()
}

const initializeApp = () => {
  numClicks = 0
  userIsBeingTimed = false
  document.getElementById('click-area').addEventListener('click', onClick)
  updateDisplay()
}


initializeApp()
