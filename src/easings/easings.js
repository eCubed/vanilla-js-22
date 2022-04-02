const toEasingDomain = (v, a, b) => (v - b) / (b - a) + 1
const fromEasingDomain = (ev, a, b) => (ev - 1) * (b - a) + b

export const getEasedValue = (v, a, b, easingFunction) => {
  const easingDomain = toEasingDomain(v, a, b)
  const easingRange = easingFunction(easingDomain)
  return fromEasingDomain(easingRange, a, b)
}

export const getEasedValueAtTime = (tv, maxTime, a, b, easingFunction) => {
  const easingDomainBasedOnTime = fromEasingDomain(tv / maxTime, 0, maxTime)
  const easingRangeBasedOnTime = easingFunction(easingDomainBasedOnTime)
  return fromEasingDomain(easingRangeBasedOnTime, a, b)

}

const A = 500
const B = 900

const linearEasingFunction = (v) => v
const quadraticEasingFunction = (v) => v * v
const quadraticEaseOutFunction = (v) => v * (2 - v)
const cubicEaseInOutFunction = (v) => -2*v*v*v + 3*v*v
/*
for (let v = A; v <= B; v += 10) {
  console.log(`${v} -> ${getEasedValue(v, A, B, quadraticEasingFunction)}`)
}
*/

const MAX_TIME = 1
// Every millisecond
for (let tv = 0; tv <= MAX_TIME; tv += 0.10) {
  console.log(`${tv} -> ${getEasedValueAtTime(tv, MAX_TIME, A, B, cubicEaseInOutFunction)}`)
}