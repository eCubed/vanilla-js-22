import { getEasedValueAtTime, linear, quadEaseIn, quadEaseOut, cubicEaseInOut } from '../utils/easingtools.js'

const MAX_TIME_MS = 1000;
let currentTimeMs = 0

const resetButton = document.getElementById('reset-button')

resetButton.addEventListener('click', () => {
  reset()
})

// I'm going to animate!
let animationHandle

const linearDiv = document.getElementById('linear-div')
const quadEaseInDiv = document.getElementById('quad-ease-in-div')
const quadEaseOutDiv = document.getElementById('quad-ease-out-div')
const cubicEaseInOutDiv = document.getElementById('cubic-ease-in-out-div')

const reset = () => {
  linearDiv.style.left = '0'
  quadEaseInDiv.style.left = '0'
  currentTimeMs = 0
  animate()
}

const animate = () => {
  if (currentTimeMs <= MAX_TIME_MS) {
    const linearEaseValue = getEasedValueAtTime(currentTimeMs, MAX_TIME_MS, 0, 500, linear)
    const quadEaseInValue = getEasedValueAtTime(currentTimeMs, MAX_TIME_MS, 0, 500, quadEaseIn)
    const quadEaseOutValue = getEasedValueAtTime(currentTimeMs, MAX_TIME_MS, 0, 500, quadEaseOut)
    const cubicEaseInOutValue = getEasedValueAtTime(currentTimeMs, MAX_TIME_MS, 0, 500, cubicEaseInOut)
    linearDiv.style.left = `${linearEaseValue}px`
    quadEaseInDiv.style.left = `${quadEaseInValue}px`
    quadEaseOutDiv.style.left = `${quadEaseOutValue}px`
    cubicEaseInOutDiv.style.left = `${cubicEaseInOutValue}px`
    currentTimeMs += 1000/60
    animationHandle = requestAnimationFrame(animate)
  }
}

animate()