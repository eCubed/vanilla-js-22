export const setupCountdown = (startingNumber, intervalMs, countdownChanged, timesUp) => {
  let intervalId
  let currentCount = startingNumber

  const reset = () => {
    currentCount = startingNumber
    countdownChanged?.call(null, currentCount)
    clearInterval(intervalId)
  }

  const start = () => {
    reset()

    intervalId = setInterval(() => {
      currentCount--;
      countdownChanged?.call(null, currentCount)

      if (currentCount === 0) {
        clearInterval(intervalId)
        timesUp?.call(null)
      }

    }, [intervalMs])
  }

  const pause = () => {
    clearInterval(intervalId)
  }

  return {
    start,
    reset,
    resume: start,
    pause
  }
}