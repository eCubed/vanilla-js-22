import { setupCanvas } from './canvasutils.js'

export const convertCartesianXToScreenX = (x, minX, maxX, screenWidth) =>
  (screenWidth / (maxX - minX)) * (x - minX)

export const convertCartesianYToScreenY = (y, minY, maxY, screenHeight) =>
  (screenHeight / (minY - maxY)) * (y - maxY)

const drawVerticalLines = (ctx, minX, maxX, canvasWidth, canvasHeight) => {

  ctx.strokeStyle = '#990000'

  for (let x = minX; x <= maxX; x++) {
    ctx.beginPath()
    ctx.lineWidth = (x === 0) ? 2 : 0.5
    const screenX = convertCartesianXToScreenX(x, minX, maxX, canvasWidth)
    // console.log(`${ctx.lineWidth}: ${x}, ${screenX}`)
    ctx.moveTo(screenX, 0)
    ctx.lineTo(screenX, canvasHeight)
    ctx.stroke()
  }
}

const drawHorizontalLines = (ctx, minY, maxY, canvasWidth, canvasHeight) => {
  ctx.strokeStyle = '#009900'

  for (let y = minY; y <= maxY; y++) {
    ctx.beginPath()
    ctx.lineWidth = (y === 0) ? 2 : 0.5
    const screenY = convertCartesianYToScreenY(y, minY, maxY, canvasHeight)
    ctx.moveTo(0, screenY)
    ctx.lineTo(canvasWidth, screenY)
    ctx.stroke()
  }
}

export const setupCartesian = (canvasId, canvasWidth, canvasHeight, minX, maxX, minY, maxY) => {
  minX = minX ?? -10
  maxX = maxX ?? 10
  minY = minY ?? -10
  maxY = maxY ?? 10

  const context2D = setupCanvas(canvasId, canvasWidth, canvasHeight)
  context2D.fillStyle = '#ccc'
  context2D.fillRect(0,0,canvasWidth,canvasHeight)

  drawVerticalLines(context2D, minX, maxX, canvasWidth, canvasHeight)
  drawHorizontalLines(context2D, minY, maxY, canvasWidth, canvasHeight)

  const drawFunction = (func) => {
    // HMM..... Let's start with
    context2D.beginPath()
    context2D.strokeStyle = '#000099'
    for (let x = minX; x <= maxX; x += 0.1) {
      const screenX = convertCartesianXToScreenX(x, minX, maxX, canvasWidth)
      const screenY = convertCartesianYToScreenY(func(x), minY, maxY, canvasHeight)
      context2D.lineTo(screenX, screenY)
    }
    context2D.stroke()
  }

  const drawParametric = (minT, maxT, xOfT, yOfT) => {
    context2D.beginPath()
    context2D.strokStyle = '#000099'
    for (let t = minT; t <= maxT; t+=0.1) {
      const screenX = convertCartesianXToScreenX(xOfT(t), minX, maxX, canvasWidth)
      const screenY = convertCartesianYToScreenY(yOfT(t), minY, maxY, canvasHeight)
      context2D.lineTo(screenX, screenY)
    }
    context2D.stroke()
  }

  return {
    drawFunction,
    drawParametric
  }
}
  