
const calculateRulerMetrics = (widthPx, startMark, endMark, levels, minTickWidthPx) => {
  const accLevels = []
  accLevels.push(levels[0])
  for (let i = 1; i < levels.length; i++) {
    accLevels.push(accLevels[i - 1] * levels[i])
  }
  // console.log(JSON.stringify(accLevels))
  // let currentAcc = accLevels[accLevels.length - 1]
  let currentLevel = levels.length - 1
  const intervalLength = Math.abs(endMark - startMark)
  console.log(`intervalLength: ${endMark - startMark} widthPx: ${widthPx}`)
  let tickWidthPx = widthPx / (intervalLength *  accLevels[currentLevel])
  console.log(`initial tickWidthPx: ${tickWidthPx}, minTickWidth: ${minTickWidthPx}`)
  
  while (tickWidthPx < minTickWidthPx) {
    console.log('loop')
    currentLevel--
    tickWidthPx = widthPx / (intervalLength * accLevels[currentLevel])
    console.log(`initial tickWidthPx: ${tickWidthPx}, minTickWidth: ${minTickWidthPx}`)
  }

  return {
    tickWidthPx,
    minLevel: currentLevel,
    numTicksPerUnit: accLevels[currentLevel],
    totalNumTicks: accLevels[currentLevel] * intervalLength,
    intervalLength
  }
}

const renderRuler = (rulerDiv, widthPx, startMark, endMark, levels, minTickWidth) => {
  rulerDiv.style.width = `${widthPx || 500}px`
  const rulerMetrics = calculateRulerMetrics(widthPx || 500, startMark, endMark, levels, minTickWidth)
  console.log(JSON.stringify(rulerMetrics))
}

export const setupRuler = (rulerId, initialWidthPx, startMark, endMark, levels) => {
  const rulerDiv = document.getElementById(rulerId)
  renderRuler(rulerDiv, initialWidthPx, startMark || 0, endMark || 5, levels || [1, 2, 2, 3], 10)

}