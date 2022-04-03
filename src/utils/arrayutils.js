export const setupArrayViewer = (array) => {
  let currentIndex = 0

  let _currentItemChangedCallback
  const currentItemChanged = (currentItemChangedCallback) => {
    _currentItemChangedCallback = currentItemChangedCallback
    _currentItemChangedCallback?.call(null, getConsecutiveItemsToDisplay())
  }

  const getConsecutiveItemsToDisplay = () => {
    const consecutiveItemsToDisplay = [];
    const previousIndex = (currentIndex === 0) ? array.length - 1 : currentIndex - 1
    consecutiveItemsToDisplay.push(array[previousIndex])
    consecutiveItemsToDisplay.push(array[currentIndex])
    const nextIndex = (currentIndex + 1) % array.length
    consecutiveItemsToDisplay.push(array[nextIndex])
    
    return consecutiveItemsToDisplay
  }

  const moveToNext = () => {
    currentIndex = (currentIndex + 1) % array.length
     _currentItemChangedCallback?.call(null, getConsecutiveItemsToDisplay())
  }

  const moveToPrevious = () => {
    currentIndex = (currentIndex === 0) ? array.length - 1 : currentIndex - 1
    _currentItemChangedCallback?.call(null, getConsecutiveItemsToDisplay())
  }

  return {
    moveToNext,
    moveToPrevious,
    currentItemChanged
  }
}