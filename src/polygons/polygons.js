import { HSLToHex, hueShiftHex } from '../utils/colortools.js';
import { setupCanvas } from '../utils/setupcanvas.js';
import { generateRandomDecimalNumberInclusive } from '../utils/utils.js';

const CANVAS_W = 800
const CANVAS_H = 500
const POLYGON_N = 3
const POLYGON_COUNT = 8
const POLYGON_PROXIMITY = 5

const canvasContext = setupCanvas('canvas', CANVAS_W, CANVAS_H)

let animationId

const polygonGroups = []

document.getElementById('toggle-run-stop').addEventListener('click', () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  } else {
    animationId = requestAnimationFrame(drawFrame)
  }
})

const createPolygon = (color) => {
  const polygon = {
    points: [],
    color: color
  }
  for (let i = 0; i < POLYGON_N; i++) {
    polygon.points.push({ 
      x: generateRandomDecimalNumberInclusive(0, CANVAS_W, 2), 
      y: generateRandomDecimalNumberInclusive(0, CANVAS_H, 2),
      dx: generateRandomDecimalNumberInclusive(-2, 2, 2),
      dy: generateRandomDecimalNumberInclusive(-2, 2, 2)
    })
  }

  return polygon
}

const drawPolygon = (polygon) => {
  canvasContext.strokeStyle = polygon.color
  canvasContext.beginPath()
  canvasContext.moveTo(polygon.points[0].x, polygon.points[0].y)
  for(let i = 1; i <= polygon.points.length; i++) {
    canvasContext.lineTo(
      polygon.points[(i) % polygon.points.length].x, 
      polygon.points[(i) % polygon.points.length].y
    )
  }
  canvasContext.lineWidth = 1;
  canvasContext.stroke()
}

const generateNextPolygon = (polygon, posDx, posDy) => {
  
  const newPolygon = {
    points: [],
    color: polygon.color
  }
  polygon.points.forEach(point => {
    let newX = point.x + posDx
    let newDx = point.dx
    if (point.x + posDx > CANVAS_W) {
      newX = CANVAS_W
    } else if (point.x + posDx < 0) {
      newX = 0
    }

    let newY = point.y + posDy
    let newDy = point.dy
    if (point.y + posDy > CANVAS_H) {
      newY = CANVAS_H
    } else if (point.y + posDy < 0) {
      newY = 0
    }

    newPolygon.points.push({
      x: newX,
      y: newY,
      dx: newDx,
      dy: newDy,
    })
  })

  return newPolygon
}

const movePolygon = (polygon) => {  
  for(let i = 0; i < polygon.points.length; i++) {
    if (polygon.points[i].x + polygon.points[i].dx > CANVAS_W) {
      polygon.points[i].x = CANVAS_W
      polygon.points[i].dx = -1 * polygon.points[i].dx
    } else if (polygon.points[i].x + polygon.points[i].dx < 0) {
      polygon.points[i].x = 0
      polygon.points[i].dx = -1 * polygon.points[i].dx
    } else {
      polygon.points[i].x += polygon.points[i].dx
    }
      
    if (polygon.points[i].y + polygon.points[i].dy > CANVAS_H) {
      polygon.points[i].y = CANVAS_H
      polygon.points[i].dy = -1 * polygon.points[i].dy
    } else if (polygon.points[i].y + polygon.points[i].dy < 0) {
      polygon.points[i].y = 0
      polygon.points[i].dy = -1 * polygon.points[i].dy
    } else {
      polygon.points[i].y += polygon.points[i].dy
    }
  }
  polygon.color = hueShiftHex(polygon.color, 1)
}

const drawFrame = () => {
  //canvasContext.clearRect(0, 0, CANVAS_W, CANVAS_H)
  canvasContext.fillStyle = '#eeeeff'
  canvasContext.fillRect(0, 0, CANVAS_W, CANVAS_H)
  polygonGroups.forEach(polygonGroup => {
    polygonGroup.forEach(polygon => {
      drawPolygon(polygon)
    })
  })
  

  polygonGroups.forEach(polygonGroup => {
    polygonGroup.forEach(polygon => {
      movePolygon(polygon)
    })
  })
  
  animationId = requestAnimationFrame(drawFrame)
}

const createPolygonGroup = () => {
  const randomHue = Math.floor(Math.random() * 360)  
  const firstPolygon = createPolygon(HSLToHex(randomHue, 50, 50))
  const polygons = []
  polygons.push(firstPolygon)
  for(let i = 0; i < POLYGON_COUNT - 1; i++) {
    polygons.push(
      generateNextPolygon(
        firstPolygon, 
        (i + 1) * POLYGON_PROXIMITY, 
        (i + 1) * POLYGON_PROXIMITY))
  }

  polygonGroups.push(polygons)
}


createPolygonGroup()
createPolygonGroup()
drawFrame()