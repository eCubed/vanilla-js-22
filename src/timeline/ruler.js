import { clearChildrenOfElement } from '../utils/domutils.js'
 

const calculateRulerMetrics = (initialWidthPerUnitPx, scaleFactor, startMark, endMark, levels, minTickWidthPx) => {
  const accLevels = []
  accLevels.push(levels[0])
  
  for (let i = 1; i < levels.length; i++) {
    accLevels.push(accLevels[i - 1] * levels[i])
  }
  
  const intervalLength = Math.abs(endMark - startMark)
  const widthPx = initialWidthPerUnitPx * intervalLength * scaleFactor
  let currentLevel = levels.length - 1
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
    intervalLength,
    totalWidthPx: widthPx
  }
}

const renderTickDiv = (leftPercent, level) => {
  const tickDiv = document.createElement('div');
  tickDiv.setAttribute('class', 'tick')
  tickDiv.style.height = `${Math.pow(0.7, level) * 30}px`
  tickDiv.style.left = `${leftPercent}%`
  return tickDiv
}

const determineLevelToUse = (tick, minLevel, levels) => {
  let acc = levels[minLevel]
  let currLevel = minLevel
  for (let i = minLevel; i > 0; i--) {
    if (tick % acc == 0) {
      currLevel--;
      acc *= levels[i - 1]
    } else {
      break;
    }
  }

  return currLevel
}

const renderRuler = (rulerDiv, initialWidthPerUnitPx, scaleFactor, startMark, endMark, levels, minTickWidth) => {
  
  const rulerMetrics = calculateRulerMetrics(initialWidthPerUnitPx || 100, scaleFactor || 1, startMark, endMark, levels, minTickWidth)
  rulerDiv.style.width = `${rulerMetrics.totalWidthPx}px`
  console.log(`@renderRuler: ${rulerMetrics.totalWidthPx}`)
  // clear the ruler!!!
  clearChildrenOfElement(rulerDiv)

  for (let i = 0; i < rulerMetrics.totalNumTicks; i++) {    
    let levelToUse = determineLevelToUse(i, rulerMetrics.minLevel, levels)    
    const tickDiv = renderTickDiv(i * rulerMetrics.tickWidthPercent, levelToUse)
    rulerDiv.appendChild(tickDiv);
  }
}

export const setupRuler = (rulerId, initialWidthPerUnitPx, startMark, endMark, levels) => {
  const rulerDiv = document.getElementById(rulerId)
  renderRuler(rulerDiv, initialWidthPerUnitPx, 1, startMark || 0, endMark || 3, levels || [1, 2, 2, 3], 10)

  const scaleRuler = (scaleFactor) => {
    renderRuler(rulerDiv, initialWidthPerUnitPx, scaleFactor, startMark || 0, endMark || 3, levels || [1, 2, 2, 3], 10)
  }

  return {
    scaleRuler
  }
}