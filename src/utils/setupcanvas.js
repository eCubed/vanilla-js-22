export const setupCanvas = (canvasId, width, height) => {
  const canvas = document.getElementById(canvasId)
  canvas.width = width
  canvas.height = height

  return canvas.getContext('2d')
}