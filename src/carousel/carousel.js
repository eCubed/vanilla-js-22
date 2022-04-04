import { setupArrayViewer } from '../utils/arrayutils.js'
import { getEasedValueAtTime, cubicEaseInOut } from '../utils/easingtools.js'
const configureCarouselDiv = (carouselId, viewerWidth, viewerHeight) => {
  
  const carouselDiv = document.getElementById(carouselId)
  carouselDiv.style.width = `${viewerWidth}px`
  carouselDiv.style.height = `${viewerHeight}px`
  carouselDiv.style.position = 'relative'
  carouselDiv.style.overflow = 'hidden'
  carouselDiv.style.boxSizing = 'border-box'
  carouselDiv.style.border = `solid 1px black`
  console.log(`configure carousel div: ${viewerHeight} height`)

  return carouselDiv
}

const renderItem = (item, width, height, itemRenderer) => {
  const itemWrap = document.createElement('div')
  itemWrap.style.position = 'absolute'
  itemWrap.style.width = `${width}px`
  itemWrap.style.height = `${height}px`
  itemWrap.appendChild(itemRenderer?.call(null, item) ?? document.createElement('div'))
  return itemWrap
}

const renderInitializedItems = (itemsToDisplay, carouselDiv, width, height, itemRenderer) => {
  // console.log(JSON.stringify(itemRenderer))
  itemsToDisplay.forEach((item, index) => {
    const itemDiv = renderItem(item, width, height, itemRenderer)
    itemDiv.style.left = `${(index - 1) * width}px`
    carouselDiv.appendChild(itemDiv)
  })
}

const launchAnimateShiftNext = (carouselDiv, width, animationDone) => {
  let animationId
  let currentTime = 0
  const MAX_TIME = 1000
  const originalLefts = []
  for (let i = 0; i < carouselDiv.children.length; i++) {
    const child = carouselDiv.children[i]
    originalLefts.push(parseInt(child.style.left, 10))
  }
  
  const animateShiftNext = () => {
    
    if (currentTime <= MAX_TIME) {
      for (let i = 0; i < carouselDiv.children.length; i++) {
        const child = carouselDiv.children[i]
        const animatedLeftValueNow = getEasedValueAtTime(currentTime, MAX_TIME, originalLefts[i], originalLefts[i] - width, cubicEaseInOut)
        child.style.left = `${animatedLeftValueNow}px` 
      }

      currentTime += 1000/60
      animationId = requestAnimationFrame(animateShiftNext)
    } else {
      cancelAnimationFrame(animationId)
      animationDone()
    }
  }

  animateShiftNext()
}

const reflectMoveNextInUI = (carouselDiv, itemsToDisplay, width, height, itemRenderer) => {
  
  launchAnimateShiftNext(carouselDiv, width, () => {
    carouselDiv.removeChild(carouselDiv.firstElementChild)

    // append the latest in itemsToDisplay
    const newElement = renderItem(itemsToDisplay[2], width, height,itemRenderer)
    newElement.style.left = `${width}px`
    carouselDiv.appendChild(newElement)
  })
}


const launchAnimateShiftPrevious = (carouselDiv, width, animationDone) => {
  let animationId
  let currentTime = 0
  const MAX_TIME = 1000
  const originalLefts = []
  for (let i = 0; i < carouselDiv.children.length; i++) {
    const child = carouselDiv.children[i]
    originalLefts.push(parseInt(child.style.left, 10))
  }
  
  const animateShiftPrevious = () => {
    
    if (currentTime <= MAX_TIME) {
      for (let i = 0; i < carouselDiv.children.length; i++) {
        const child = carouselDiv.children[i]
        const animatedLeftValueNow = getEasedValueAtTime(currentTime, MAX_TIME, originalLefts[i], originalLefts[i] + width, cubicEaseInOut)
        child.style.left = `${animatedLeftValueNow}px` 
      }

      currentTime += 1000/60
      animationId = requestAnimationFrame(animateShiftPrevious)
    } else {
      cancelAnimationFrame(animationId)
      animationDone()
    }
  }

  animateShiftPrevious()
}

const reflectMovePreviousInUI = (carouselDiv, itemsToDisplay, width, height, itemRenderer) => {
  
  launchAnimateShiftPrevious(carouselDiv, width, () => {
    carouselDiv.removeChild(carouselDiv.lastElementChild)

    // append the latest in itemsToDisplay
    const newElement = renderItem(itemsToDisplay[0], width, height,itemRenderer)
    newElement.style.left = `${-1 * width}px`
    carouselDiv.prepend(newElement)
  })
}

export const setupCarousel = (carouselId, array, viewerWidth, viewerHeight, itemRenderer) => {
  let initializedAlready = false
  let havingMovedTo
  const { moveToNext, moveToPrevious, currentItemChanged } = setupArrayViewer(array)
  const carouselDiv = configureCarouselDiv(carouselId, viewerWidth, viewerHeight)

  const previousButton = document.getElementById('previous-button')
  previousButton.addEventListener('click', () => {
    havingMovedTo = 'previous'
    moveToPrevious()
  })

  const nextButton = document.getElementById('next-button')
  nextButton.addEventListener('click', () => {    
    havingMovedTo = 'next'
    moveToNext()
  })

  currentItemChanged((itemsToDisplay) => {
    
    if (!initializedAlready) {
      // We now have to render the initialized items!
      renderInitializedItems(itemsToDisplay, carouselDiv, viewerWidth, viewerHeight, itemRenderer)
      initializedAlready = true
    } else {
      // Determine shifts.
      if (havingMovedTo === 'next') {
        reflectMoveNextInUI(carouselDiv, itemsToDisplay, viewerWidth, viewerHeight, itemRenderer)
      } else if (havingMovedTo === 'previous') {
        reflectMovePreviousInUI(carouselDiv, itemsToDisplay, viewerWidth, viewerHeight, itemRenderer)
      }
    }
  })
}

// SAMPLE USAGE
setupCarousel('carousel', 
  ['apple', 'banana', 'grape', 'orange', 'peach'], 
  400, 
  300,
  (item) => {
    const div = document.createElement('div')
    div.innerText = item
    return div
  })
