import { setupRuler } from './ruler.js'
import { setupScaler } from './scaler.js'

const setWidthStyleToAllTracks = (widthStyle) => {
  const trackDivs = document.querySelectorAll('.track')
  trackDivs.forEach(trackDiv => {
    trackDiv.style.width = `${widthStyle}`
  })
}

const resolveTimelineConfig = (timelineConfig) => {
  return {
    sliderResolution: timelineConfig?.sliderResolution ?? 51,
    scaleMax: timelineConfig?.scaleMax ?? 3,
    rulerLevels: timelineConfig?.rulerLevels ?? [1,2,5,2],
    startMark: timelineConfig?.startMark ?? 0,
    endMark: timelineConfig?.endMark ?? 5,
    formatLabel: timelineConfig?.formatLabel ?? ((value, level) => level === 0 ? value.toFixed(2).toString() : '')
  }
}

export const setupTimeline = (timelineId, timelineConfig) => {

  const _timelineConfig = resolveTimelineConfig(timelineConfig)

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
  scalerInput.setAttribute('max', _timelineConfig.sliderResolution)
  scalerInput.setAttribute('value', (_timelineConfig.sliderResolution + 1)/2)
  scalerDiv.appendChild(scalerInput)

  const scalerDisplaySpan = document.createElement('span')
  scalerDisplaySpan.setAttribute('id', 'scaler-display')
  scalerDisplaySpan.innerText = '1x'
  scalerDiv.appendChild(scalerDisplaySpan)
  
  // stretch
  const initialWidthPerUnitPx = timelineDiv.getBoundingClientRect().width / (_timelineConfig.endMark - _timelineConfig.startMark)
  
  const { scaleRuler } = setupRuler('ruler', initialWidthPerUnitPx, _timelineConfig.startMark, _timelineConfig.endMark, _timelineConfig.rulerLevels, _timelineConfig.formatLabel)
  const { onScaleFactorChanged } = setupScaler('slider', _timelineConfig.sliderResolution, _timelineConfig.scaleMax)

  onScaleFactorChanged((scaleFactor) => {
    scalerDisplaySpan.innerText = `${Math.round(scaleFactor * 10) / 10}x`
    scaleRuler(scaleFactor)
    setWidthStyleToAllTracks(rulerDiv.style.width)
  })
  

  const addTrack = () => {
    const trackDiv = document.createElement('div')
    trackDiv.setAttribute('class', 'track')
    trackDiv.style.width = rulerDiv.style.width;
    timelineTracksDiv.appendChild(trackDiv)
  }

  return {
    addTrack
  }

}