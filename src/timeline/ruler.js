
const calculateRulerMetrics = (widthPx, startMark, endMark, levels, minTickWidthPx) => {
  const accLevels = []
  accLevels.push(levels[0])
  
  for (let i = 1; i < levels.length; i++) {
    accLevels.push(accLevels[i - 1] * levels[i])
  }

  let currentLevel = levels.length - 1
  const intervalLength = Math.abs(endMark - startMark)
  let tickWidthPx = widthPx / (intervalLength *  accLevels[currentLevel])
  
  while (tickWidthPx < minTickWidthPx) {
    currentLevel--
    tickWidthPx = widthPx / (intervalLength * accLevels[currentLevel])
  }

  return {
    tickWidthPx,
    tickWidthPercent: tickWidthPx / widthPx * 100,
    minLevel: currentLevel,
    numTicksPerUnit: accLevels[currentLevel],
    totalNumTicks: accLevels[currentLevel] * intervalLength,
    intervalLength
  }
}

const renderTickDiv = (leftPercent, level) => {
  const tickDiv = document.createElement('div');
  tickDiv.setAttribute('class', 'tick')
  tickDiv.style.height = `${1/level * 20}px`
  tickDiv.style.left = `${leftPercent}%`
  return tickDiv
}

const renderRuler = (rulerDiv, widthPx, startMark, endMark, levels, minTickWidth) => {
  rulerDiv.style.width = `${widthPx || 500}px`
  const rulerMetrics = calculateRulerMetrics(widthPx || 500, startMark, endMark, levels, minTickWidth)
  // console.log(JSON.stringify(rulerMetrics))
  for (let i = 0; i < rulerMetrics.totalNumTicks; i++) {
    // First let's render the ticks.
    let levelToUse = rulerMetrics.minLevel
    // let's figure out the level
    if (i % rulerMetrics.numTicksPerUnit == 0) {
      levelToUse -= 1
    }

    const tickDiv = renderTickDiv(i * rulerMetrics.tickWidthPercent, levelToUse)
    rulerDiv.appendChild(tickDiv);
  }
}

export const setupRuler = (rulerId, initialWidthPx, startMark, endMark, levels) => {
  const rulerDiv = document.getElementById(rulerId)
  renderRuler(rulerDiv, initialWidthPx, startMark || 0, endMark || 2, levels || [1, 2, 2, 3], 10)

}