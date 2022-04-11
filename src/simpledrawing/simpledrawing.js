import { setupCanvas, drawPolygon } from '../utils/canvasutils.js'
 
const CANVAS_W = 640
const CANVAS_H = 480

const { canvas, canvasContext } = setupCanvas('canvas', CANVAS_W, CANVAS_H)
canvasContext.fillStyle = 'white'
canvasContext.fillRect(0,0,CANVAS_W,CANVAS_H)
// stroke object
// { width: number, color: string, points: [{x: number, y: number}] }
const strokes = []
let isDrawing = false
let currentColor = '#000000'
let currentLineWidth = 2

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true
  const newStroke = { width: currentLineWidth, color: currentColor, points: []}
  const newPoint = calculateCanvasCoordinatesFromMouse(e)
  newStroke.points.push(newPoint)
  strokes.push(newStroke) 
  //drawCanvas()
  canvasContext.strokeStyle = newStroke.color
  canvasContext.lineWidth = currentLineWidth
  canvasContext.beginPath()
  canvasContext.moveTo(newPoint.x, newPoint.y)
})

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    const currentStroke = strokes[strokes.length - 1]
    const newPoint = calculateCanvasCoordinatesFromMouse(e)
    currentStroke.points.push(newPoint)
    canvasContext.lineTo(newPoint.x, newPoint.y)
    canvasContext.stroke()
  }
})

canvas.addEventListener('mouseup', (e) => {
  isDrawing = false
  canvasContext.stroke()
})


const calculateCanvasCoordinatesFromMouse = (e) => {
  const { x: canvasX, y:canvasY} = canvas.getBoundingClientRect()
  console.log(canvasX)
  return { x: e.clientX - canvasX, y: e.clientY - canvasY }
}

document.getElementById('clear-button').addEventListener('click', () => {
  canvasContext.fillStyle = 'white'
  canvasContext.fillRect(0,0,CANVAS_W,CANVAS_H)
  strokes = []
})

document.getElementById('color-select').addEventListener('change', (e) => {
  currentColor = e.target.value
})

document.getElementById('line-width-select').addEventListener('change', (e) => {
  currentLineWidth = e.target.value
})


/*
const drawCanvas = () => {
  strokes.forEach(stroke => {
    drawPolygon(canvasContext, stroke.points, stroke.color)
  })
}
*/
