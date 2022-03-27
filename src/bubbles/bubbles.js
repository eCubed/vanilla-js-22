import { generateRandomDecimalNumberInclusive } from '../utils/utils.js'
import { setupCanvas } from '../utils/setupcanvas.js'

const CANVAS_W = 1000
const CANVAS_H = 1000
/*
const sampleBubble = {
  x: 0, y: 0, z: 0, dx: 1, dy: 1
}
*/
let animationId

const bubbles = []

const colors = ['#990000', '#009900', '#000099', '#ccffaa', '#999900', '#009999']

const canvasContext = setupCanvas('canvas', 1000, 600)

const generateRandomColor = () => colors[Math.floor(Math.random() * (colors.length))]

const manageBubbleRegeneration = (bubble) => {
  // if bubble goes off-canvas

  if (bubble.x - bubble.r > CANVAS_W || bubble.x + bubble.r < 0 ||
      bubble.y + bubble.r < 0 || bubble.y - bubble.r > CANVAS_H) {
    
    const index = bubbles.indexOf(bubble)
    bubbles[index] = generateReplacementBubble()
  }

  // console.log(bubbles.length)
}

const changeVelocity = (bubble) => {
  const willChangeX = Math.random() <= 0.01
  const willChangeY = Math.random() <= 0.01
  
  if (willChangeX) bubble.dx = -1 * bubble.dx
  if (willChangeY) bubble.dy = -1 * bubble.dy

} 

const drawFrame = () => {
  canvasContext.clearRect(0, 0, CANVAS_W, CANVAS_H)
  bubbles.forEach(bubble => {
    canvasContext.fillStyle = bubble.color
    canvasContext.beginPath()
    canvasContext.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI)
    canvasContext.fill()

    /* Randomly change bubble's velocity (magnitude still the same)
    */
    changeVelocity(bubble)
    
    // change position!
    bubble.x += bubble.dx
    bubble.y += bubble.dy

    manageBubbleRegeneration(bubble)
  })

  animationId = requestAnimationFrame(drawFrame)
}

const runAnimation = () => {
 
  animationId = requestAnimationFrame(drawFrame)
}

const generateStartingBubble = () => {
  return {
    x: generateRandomDecimalNumberInclusive(0, CANVAS_W, 2),
    y: generateRandomDecimalNumberInclusive(0, CANVAS_H, 2),
    r: generateRandomDecimalNumberInclusive(35, 150, 2),
    dx: generateRandomDecimalNumberInclusive(-5,5, 2),
    dy: generateRandomDecimalNumberInclusive(-5,5, 2),
    color: generateRandomColor()
  }
}

const generateReplacementBubble = () => {
  const radius = generateRandomDecimalNumberInclusive(35, 150, 2)

  // sides
  const horizontal = Math.random() >= 0.5
  if (horizontal) {
    const startsOffLeft = Math.random() >= 0.5
    const x = startsOffLeft ? -1 *radius : CANVAS_W + radius
    // then we can generate any y
    return {
      x: x,
      y: generateRandomDecimalNumberInclusive(0, CANVAS_H, 2),
      r: radius,
      dx: (x < 0) ? generateRandomDecimalNumberInclusive(0, 5, 2) : generateRandomDecimalNumberInclusive(-5,0, 2),
      dy: generateRandomDecimalNumberInclusive(-5,5, 2),
      color: generateRandomColor()
    }
  } else {
    const startsOffBottom = Math.random() >= 0.5
    const y = startsOffBottom ? CANVAS_H + radius : -1 * radius
    return {
      x: generateRandomDecimalNumberInclusive(0, CANVAS_W, 2),
      y: y,
      r: radius,
      dx: generateRandomDecimalNumberInclusive(-5,5, 2),
      dy: (y < 0) ? generateRandomDecimalNumberInclusive(0, 5, 2) : generateRandomDecimalNumberInclusive(-5,0, 2),
      color: generateRandomColor()
    }
  }
} 

const initialize = () => {
  // Initialize bubbles
  for (let i = 0; i < 10; i++) {
    bubbles.push(generateStartingBubble())
  }
  console.log(JSON.stringify(bubbles))
  runAnimation()
}

initialize()