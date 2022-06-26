
import { setupTimeline } from './timeline.js'

const { addTrack } = setupTimeline('timeline')
addTrack()

/*
const { setRulerWidthPx } = setupRuler('ruler')
const { onScaleFactorChanged } = setupScaler('slider', 50, 3)
onScaleFactorChanged((scaleFactor) => {
  setRulerWidthPx(500 * scaleFactor)
})
*/
