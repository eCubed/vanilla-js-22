export const setupCountdown = (startingTime, remainingTimeChanged, canContinueCountdownCallback, taskNotAccomplishedInTime) => {
  let remainingTime = startingTime
  let timerId
  remainingTimeChanged(remainingTime)
  
  const runCountdown = () => {
    remainingTime = startingTime    
    remainingTimeChanged(remainingTime)

    timerId = setInterval(() => {
      remainingTime--;
      console.log(remainingTime)
      remainingTimeChanged(remainingTime)
  
      if (remainingTime === 0 && canContinueCountdownCallback) {
        clearInterval(timerId) 
        taskNotAccomplishedInTime()       
      }
    }, 1000)
  }

  const stopCountdown = () => {
    timerId && clearInterval(timerId)
    remainingTime = startingTime
  }

  return {
    runCountdown,
    stopCountdown
  }
}