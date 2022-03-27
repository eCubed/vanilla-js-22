export const clearChildrenOfElement = (element) => {
  while(element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

export const generateRandomDecimalNumberInclusive = (min, max, decimalPlaces) => {
  var rand = Math.random() * (max - min + 1) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
}

export const clamp = (min, max, v) => {
  if (v < min)
    return min
  else if (v > max)
    return max
  else
    return v
}

export const generateRandomIntegerInclusive = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min

export const scrambleArray = (array) => {
  if (array.length >= 2) {
    for(let i = 0; i < array.length / 2; i++) {
      const rndIndx1 = generateRandomIntegerInclusive(0, array.length - 1)
      const rndIndx2 = generateRandomIntegerInclusive(0, array.length - 1)
      const temp = array[rndIndx1]
      array[rndIndx1] = array[rndIndx2]
      array[rndIndx2] = temp
    }
  }
}

export const chooseRandomDistinctItemsFromArray = (array, howMany) => {
  const chosenIndices = []

  if (howMany >= array.length)
    return array
  else {
    for(let i = 0; i < howMany; i++) {   

      let chosenIndex = generateRandomIntegerInclusive(0, array.length - 1)
      
      while(chosenIndices.filter(i => i === chosenIndex).length > 0) {
        chosenIndex = generateRandomIntegerInclusive(0, array.length - 1)
      }
      
      chosenIndices.push(chosenIndex)
    }
    const chosenItems = []
    chosenIndices.forEach(chosenIndex => {
      chosenItems.push(array[chosenIndex])
    })
    return chosenItems
  }
  
}