import { clamp } from '../utils/basicutils.js'

export const computeRiemannSum = (a, b, n, func) => {
  const diffX = (b - a) / n

  let sum = 0
  for (let k = a; k < b; k += diffX) {
    sum += func(k) * diffX
  }
  
  return sum
}

export const computeTrapezoidSum = (a, b, n, func) => {
  const diffX = (b - a) / n

  let sum = 0
  for (let k = a; k < b; k += diffX) {
    sum += 0.5 * (func(k) + func(k + diffX)) * diffX
  }

  return sum
}

export const computeArcLength = (a, b, n, func) => {
  const diffX = (b - a) / n
  let sum = 0
  for (let k = a; k < b; k += diffX) {
    const fs = func(clamp(a, b,k + diffX)) -  func(k)
    sum += Math.sqrt(diffX * diffX + fs * fs)
  }

  return sum
}

export const computeArcLengthParametric = (ta, tb, n, funcX, funcY, funcZ) => {
  funcZ = funcZ ?? ((z) => 0)
  const diffT = (tb - ta) / n

  let sum = 0
  for (let k = ta; k < tb; k += diffT) {
    const xComp = funcX(k + diffT) - funcX(k)
    const yComp = funcY(k + diffT) - funcY(k)
    const zComp = funcZ(k + diffT) - funcZ(k)
    sum += Math.sqrt(xComp * xComp + yComp * yComp + zComp * zComp)
  }

  return sum
}

export const findTAtArcLength = (startT, arcLength, direction, n, funcX, funcY, funcZ) => {
  funcZ = funcZ ?? ((z) => 0)
  const diffT = 1 / n
  let k = startT
  let sum = 0
  while (sum <= arcLength) {
    const xComp = funcX(k + diffT) - funcX(k)
    const yComp = funcY(k + diffT) - funcY(k)
    const zComp = funcZ(k + diffT) - funcZ(k)

    sum += direction * Math.sqrt(xComp * xComp + yComp * yComp + zComp * zComp)
    k += diffT
  }

  k -= diffT

  return k
}

const value = computeRiemannSum(0, 1, 5000, x => x * x)
const trapValue = computeTrapezoidSum(0, 1, 500, x => x * x)
console.log(`Area of x * x under between 0 and 1 is: ${value}`)
console.log(`Area of x * x under between 0 and 1 is: ${trapValue}`)
const arcLength = computeArcLength(-1, 1, 50000, x => Math.sqrt(1 - x * x))
console.log(`Arclength of half a circle ${arcLength}`)

const paramArcLength = computeArcLengthParametric(0, Math.PI * 2, 100, (t) => 3 * Math.sin(t), (t) => 3* Math.cos(t))
console.log(`Arclength of half a circle parametrized ${paramArcLength}`)

const tAtArcLength = findTAtArcLength(0, 1, 1, 500, (t) => t, (t) => t * t)
console.log(`t at arc length for parabola is ${tAtArcLength}`)
const check = computeArcLength(0,tAtArcLength, 500, t => t, t => t * t)
console.log(`check: ${check}`)