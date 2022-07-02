
import { setupTimeline } from './timeline.js'

const { addTrack, addClip, clipSelected } = setupTimeline('timeline')
addTrack('a')
addTrack('b')
addClip('a', 0.25, 1, 'a-1', {})
addClip('a', 1, 1, 'a-2', {})

clipSelected(({id, trackId}) => {
  console.log(`The clip selected was ${id} from track ${trackId}`)
})

/*
const { setRulerWidthPx } = setupRuler('ruler')
const { onScaleFactorChanged } = setupScaler('slider', 50, 3)
onScaleFactorChanged((scaleFactor) => {
  setRulerWidthPx(500 * scaleFactor)
})
*/
