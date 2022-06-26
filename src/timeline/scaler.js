const generateScaleFactor = (sliderValue, sliderMax, scaleMax) => {
  return Math.pow(scaleMax, (1/scaleMax) * (2*scaleMax/(sliderMax-1) * (sliderValue - sliderMax) + scaleMax) )
}

export const setupScaler = (sliderId, sliderMax, scaleMax) => {
  const scalerInput = document.getElementById(sliderId)

  let _onScaleFactorChanged;
  
  scalerInput.addEventListener('input', (e) => {
    
    if (_onScaleFactorChanged) {
      _onScaleFactorChanged(generateScaleFactor(e.target.value, sliderMax, scaleMax))
    }
  })

  return {
    onScaleFactorChanged: (callbackFunction) => { _onScaleFactorChanged = callbackFunction }
  }
}