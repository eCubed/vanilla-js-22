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
  
  export const chooseRandomItemFromArray = (array) => {
    if (array === null)
      return null
    if (array.length === 1)
      return array[0]
  
    const randomIndex = generateRandomIntegerInclusive(0, array.length - 1)
    return array[randomIndex]
  }

  export const generateRandomPoints2D = (howMany, minX, maxX, minY, maxY) => {
    const chosenAlreadyPoints = {}
    const points = []

    for(let c = 0; c < howMany; c++) {
      let rx = generateRandomIntegerInclusive(minX, maxX)
      let ry = generateRandomIntegerInclusive(minY, maxY)

      while(chosenAlreadyPoints[`p-${rx}-${ry}`] !== undefined) {
        rx = generateRandomIntegerInclusive(minX, maxX)
        ry = generateRandomIntegerInclusive(minY, maxY)
      }

      chosenAlreadyPoints[`p-${rx}-${ry}`] = 'anything'
      points.push({ x: rx, y: ry})
    }

    return points;
  }

  export const generateRandomPoints3D = (howMany, minX, maxX, minY, maxY, minZ, maxZ) => {
    const random2DPoints = generateRandomPoints2D(howMany, minX, maxX, minY, maxY);
    random2DPoints.forEach(r2d => {
      r2d.z = generateRandomIntegerInclusive(minZ, maxZ)
    })

    return random2dPoinst
  }