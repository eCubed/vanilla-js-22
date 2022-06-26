import { setupRuler } from './ruler.js'
import { setupScaler } from './scaler.js'

const setTrackWidths = (widthPx) => {
  const trackDivs = document.querySelectorAll('.track')
  trackDivs.forEach(trackDiv => {
    trackDiv.style.width = `${widthPx}px`
  })
  console.log(`setTrackWidth: ${trackDivs.length}`)
}

export const setupTimeline = (timelineId) => {

  const timelineDiv = document.getElementById(timelineId)
  const timelineTracksDiv = document.createElement('div')
  timelineTracksDiv.setAttribute('id', 'timeline-tracks')
  timelineDiv.appendChild(timelineTracksDiv)  
  
  const rulerDiv = document.createElement('div')
  rulerDiv.setAttribute('id', 'ruler')
  timelineTracksDiv.appendChild(rulerDiv)

  const scalerDiv = document.createElement('div')
  timelineDiv.appendChild(scalerDiv)

  const scalerInput = document.createElement('input')
  scalerInput.setAttribute('id', 'slider')
  scalerInput.setAttribute('type', 'range')
  scalerInput.setAttribute('min', 1)
  scalerInput.setAttribute('max', 51)
  scalerInput.setAttribute('value', 26)
  scalerDiv.appendChild(scalerInput)

  const scalerDisplaySpan = document.createElement('span')
  scalerDisplaySpan.setAttribute('id', 'scaler-display')
  scalerDiv.appendChild(scalerDisplaySpan)
  

  const { setRulerWidthPx } = setupRuler('ruler')
  const { onScaleFactorChanged } = setupScaler('slider', 50, 3)

  onScaleFactorChanged((scaleFactor) => {
    scalerDisplaySpan.innerText = `${Math.round(scaleFactor * 10) / 10}x`
    setRulerWidthPx(500 * scaleFactor)
    setTrackWidths(500 * scaleFactor)
  })
  

  const addTrack = () => {
    const trackDiv = document.createElement('div')
    trackDiv.setAttribute('class', 'track')
    trackDiv.style.width = `500px`
    timelineTracksDiv.appendChild(trackDiv)
  }

  return {
    addTrack
  }

}