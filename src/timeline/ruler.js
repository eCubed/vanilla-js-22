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


const _formatLabel = (value, level) => {
  console.log(`LEVEL .. ${level}`)
  if (level == 0) {
    return `${value}:00`
  } else if (level == 1) {    
    return `${Math.floor(value)}:30`
  } else if (level == 2) {
    const wholePortion = Math.floor(value)
    const decimalPortion = value - wholePortion
    const minutes = Math.floor(decimalPortion * 60)
    return `${wholePortion}:${minutes}`
  } else {
    return ''
  }
}

const renderRuler = (rulerDiv, initialWidthPerUnitPx, scaleFactor, startMark, endMark, levels, minTickWidth, formatLabel) => {
  formatLabel = formatLabel ?? _formatLabel
  const rulerMetrics = calculateRulerMetrics(initialWidthPerUnitPx || 100, scaleFactor || 1, startMark, endMark, levels, minTickWidth)
  rulerDiv.style.width = `${rulerMetrics.totalWidthPx}px`
  // clear the ruler!!!
  clearChildrenOfElement(rulerDiv)

  for (let i = 0; i < rulerMetrics.totalNumTicks; i++) {    
    let levelToUse = determineLevelToUse(i, rulerMetrics.minLevel, levels)    
    const tickDiv = renderTickDiv(i * rulerMetrics.tickWidthPercent, levelToUse)
    rulerDiv.appendChild(tickDiv);

    const labelDiv = document.createElement('div')
    labelDiv.setAttribute('class', 'label')
    labelDiv.style.position = 'absolute'
    labelDiv.style.top = '20px'      
    labelDiv.style.left = `${i * rulerMetrics.tickWidthPx + ((levelToUse === 0) ? 3 : -1)}px`
    labelDiv.innerHTML = formatLabel(i / rulerMetrics.numTicksPerUnit, levelToUse)
    
    rulerDiv.appendChild(labelDiv)
    
    
    const labelDivWidthPx = labelDiv.getBoundingClientRect().width

    if (labelDivWidthPx === 0) {
      rulerDiv.removeChild(labelDiv)
    }
  }

  // Now, we need to remove the labelDivs whose left coordinate is less than the previous's left
  // coordinate + width. 
  const labelDivs = Array.from(rulerDiv.querySelectorAll('div.label'))
  labelDivs.forEach(labelDiv => {
    console.log(`Queried labelDiv: ${labelDiv.style.width}`)
  })
  console.log(`Label Divs length: ${labelDivs.length}`)
  const overlappingLabelDivs = labelDivs.filter((labelDiv, index) => {
    // pick only the elements whose left index is less than the previous label's left + width
    return index > 0 &&
    parseInt(labelDiv.style.left) < parseInt(labelDivs[index - 1].style.left) + labelDivs[index - 1].getBoundingClientRect().width + 10
  })
  console.log(`overlapping label divs: ${overlappingLabelDivs.length}`)
  overlappingLabelDivs.forEach(overlappingLabelDiv => {
    rulerDiv.removeChild(overlappingLabelDiv)
  })
}

export const setupRuler = (rulerId, initialWidthPerUnitPx, startMark, endMark, levels, formatLabel) => {
  const rulerDiv = document.getElementById(rulerId)
  renderRuler(rulerDiv, initialWidthPerUnitPx, 1, startMark || 0, endMark || 3, levels || [1, 2, 2, 3], 10, formatLabel)

  const scaleRuler = (scaleFactor) => {
    renderRuler(rulerDiv, initialWidthPerUnitPx, scaleFactor, startMark || 0, endMark || 3, levels || [1, 2, 2, 3], 10, formatLabel)
  }

  return {
    scaleRuler
  }
}