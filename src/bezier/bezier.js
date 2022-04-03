import { generateRandomDecimalNumberInclusive, generateRandomIntegerInclusive, generateRandomPoints2D } from '../utils/randomutils.js';
import { setupCanvas } from '../utils/setupcanvas.js'

const CANVAS_W = 640
const CANVAS_H = 480
const T_INCR = 0.001

const canvasContext = setupCanvas('canvas', CANVAS_W, CANVAS_H);

let points = generateRandomPoints2D(4, 0, CANVAS_W, 0, CANVAS_H)

const regenerateButton = document.getElementById('regenerate-button')
regenerateButton.addEventListener('click', () => {
  regenerate()
})

export const bezier = (t, p0, p1, p2, p3) => {
  return p3 * t * t * t + 3 * p2 * t * t * (1 - t) + 3 * p1 * t * (1 - t) * (1 - t) + p0 * (1 - t) * (1 - t) * (1 - t)
}

export const bezierFirstDerivative = (t, p0, p1, p2, p3) => {
  return 3 * (1 - t) * (1 - t) * (p1 - p0) + 6 * (1 - t)*t*(p2 - p1) + 3 * t * t *(p3 - p2)
}

export const generateNextRandomBezierSmooth = (currentBezier) => {
  const bezierHandles = []
  bezierHandles.push(currentBezier[3])
  
  const dx = bezierFirstDerivative(1, currentBezier[0].x, currentBezier[1].x, currentBezier[2].x, currentBezier[3].x)
  const dy = bezierFirstDerivative(1, currentBezier[0].y, currentBezier[1].y, currentBezier[2].y, currentBezier[3].y)
  console.log(`dx, dy: ${dx}, ${dy}`)
  
  let newP1x = dx * generateRandomDecimalNumberInclusive(0, 0.5, 1) + currentBezier[3].x 
  let newP1y = dy * generateRandomDecimalNumberInclusive(1, 0.5, 1) + currentBezier[3].y 
  console.log(`initial newP1xy: ${newP1x}, ${newP1y}`)
  
  while ((newP1x < 0 || newP1x > CANVAS_W) ||
        (newP1y < 0 || newP1y > CANVAS_H)) {
    newP1x = dx * generateRandomDecimalNumberInclusive(0, 0.5, 1) + currentBezier[3].x 
    newP1y = dy * generateRandomDecimalNumberInclusive(0, 0.5, 1) + currentBezier[3].y
  }
  bezierHandles.push({
    x: newP1x,
    y: newP1y
  })
  
  let points = generateRandomPoints2D(2, 0, CANVAS_W, 0, CANVAS_H)
  points.forEach(point => 
    bezierHandles.push(point)
  )

  const confirmDx = bezierFirstDerivative(1, bezierHandles[0].x, bezierHandles[1].x, bezierHandles[2].x, bezierHandles[3].x)
  console.log(`confirmDx: ${confirmDx}`)
  return bezierHandles
}

const drawBezierPoints = (bezierPoints) => {
  
  canvasContext.beginPath()
  canvasContext.moveTo(bezierPoints[0].x, bezierPoints[0].y)
  for (let i = 1; i < bezierPoints.length; i++) {
    canvasContext.lineTo(bezierPoints[i].x, bezierPoints[i].y)
  }
  canvasContext.stroke()
}

const regenerate = () => {
  canvasContext.clearRect(0, 0, CANVAS_W, CANVAS_H)
  const handles = generateRandomPoints2D(4, 0, 640, 0, 480)
  console.log(JSON.stringify(handles))
  const bezierPoints = []
  for (let t = 0; t <= 1.00; t += T_INCR) {
    bezierPoints.push({
      x: bezier(t, handles[0].x, handles[1].x, handles[2].x, handles[3].x),
      y: bezier(t, handles[0].y, handles[1].y, handles[2].y, handles[3].y)
    })
  }
  drawBezierPoints(bezierPoints)
  const nextBezierHandles = generateNextRandomBezierSmooth(handles)
  console.log('Next handles')
  console.log(JSON.stringify(nextBezierHandles))
  const nextHandleBezierPoints = []
  for (let u = 0; u <= 1.00; u += T_INCR) {
    nextHandleBezierPoints.push({
      x: bezier(u, nextBezierHandles[0].x, nextBezierHandles[1].x, nextBezierHandles[2].x, nextBezierHandles[3].x),
      y: bezier(u, nextBezierHandles[0].y, nextBezierHandles[1].y, nextBezierHandles[2].y, nextBezierHandles[3].y)
    })
  }

  drawBezierPoints(nextHandleBezierPoints)
}

regenerate()