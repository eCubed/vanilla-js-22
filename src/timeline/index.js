import { setupRuler } from './ruler.js'
import { setupScaler } from './scaler.js'

const { setRulerWidthPx } = setupRuler('ruler')
const { onScaleFactorChanged } = setupScaler('slider', 50, 3)
onScaleFactorChanged((scaleFactor) => {
  setRulerWidthPx(500 * scaleFactor)
})
