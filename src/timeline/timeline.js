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
    rulerLevels: timelineConfig?.rulerLevels ?? [1,2,2,3],
    startMark: timelineConfig?.startMark ?? 0,
    endMark: timelineConfig?.endMark ?? 5,
    formatLabel: timelineConfig?.formatLabel
  }
}

export const setupTimeline = (timelineId, timelineConfig) => {

  let _clipSelected = null
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
  

  const addTrack = (trackId) => {

    const trackDivByTrackId = timelineTracksDiv.querySelector(`#${trackId}`)
    if (trackDivByTrackId == null) {      
      const trackDiv = document.createElement('div')
      trackDiv.setAttribute('class', 'track')
      trackDiv.setAttribute('id', trackId)
      trackDiv.style.width = rulerDiv.style.width;
      timelineTracksDiv.appendChild(trackDiv)
    }
  }

  const createAndPositionClipDiv = (trackDiv, startMark, duration, id, data) => {
    const clipDiv = document.createElement('div')
    const entireTrackDuration = _timelineConfig.endMark - _timelineConfig.startMark
    clipDiv.style.left = `${startMark/entireTrackDuration * 100}%`
    clipDiv.style.width = `${duration/entireTrackDuration * 100}%`
    clipDiv.setAttribute('data', data)
    clipDiv.setAttribute('id', id)
    clipDiv.setAttribute('class', 'clip')
    clipDiv.addEventListener('click', () => {
      if (!clipDiv.classList.contains('selected')) {
        clipDiv.classList.add('selected')
      }
      
      if (_clipSelected != null) {
        _clipSelected({
          trackId: trackDiv.getAttribute('id'),
          id,
          data
        })
      }

      // Deselect clipDivs that are NOT it
      Array.from(trackDiv.querySelectorAll(`.clip`)).filter(cd => cd.getAttribute('id') !== id).forEach(cd => {
        if (cd.classList.contains('selected')) {
          cd.classList.remove('selected')
        }
      })
    })
    trackDiv.appendChild(clipDiv)
  }

  const addClip = (trackId, startMark, duration, id, data) => {
    const trackDivByTrackId = timelineTracksDiv.querySelector(`#${trackId}`)
    if (trackDivByTrackId != null) {      
      createAndPositionClipDiv(trackDivByTrackId,startMark, duration, id, data)
    }
  }

  return {
    addTrack,
    addClip,
    clipSelected: ((clipSelected) => _clipSelected = clipSelected)
  }

}