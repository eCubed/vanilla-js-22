export const setupCanvas = (canvasId, width, height) => {
  const canvas = document.getElementById(canvasId)
  canvas.width = width
  canvas.height = height

  return { canvasContext: canvas.getContext('2d'), canvas }
}

export const drawPolygon = (canvasCtx, points, color) => {
  canvasCtx.strokeStyle = color
  canvasCtx.beginPath()
  canvasCtx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    canvasCtx.lineTo(points[i].x, points[i].y)
  }
  canvasCtx.stroke()
}