import { setupRuler } from './ruler.js'
import { setupScaler } from './scaler.js'

export const setupTimeline = (timelineId) => {

  const timelineDiv = document.getElementById(timelineId)
  const timelineTracksDiv = document.createElement('div')
  timelineTracksDiv.setAttribute('id', 'timeline-tracks')
  timelineDiv.appendChild(timelineTracksDiv)  
  
  const rulerDiv = document.createElement('div')
  rulerDiv.setAttribute('id', 'ruler')
  timelineTracksDiv.appendChild(rulerDiv)

  const scalerInput = document.createElement('input')
  scalerInput.setAttribute('id', 'slider')
  scalerInput.setAttribute('type', 'range')
  scalerInput.setAttribute('min', 1)
  scalerInput.setAttribute('max', 51)
  scalerInput.setAttribute('value', 26)
  timelineDiv.appendChild(scalerInput)

  const { setRulerWidthPx } = setupRuler('ruler')
  const { onScaleFactorChanged } = setupScaler('slider', 50, 3)
  onScaleFactorChanged((scaleFactor) => {
    setRulerWidthPx(500 * scaleFactor)
  })
}