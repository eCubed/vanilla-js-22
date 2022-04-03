const toEasingDomain = (v, a, b) => (v - b) / (b - a) + 1
const fromEasingDomain = (ev, a, b) => (ev - 1) * (b - a) + b

export const getEasedValue = (v, a, b, easingFunction) => {
  const easingDomain = toEasingDomain(v, a, b)
  const easingRange = easingFunction(easingDomain)
  return fromEasingDomain(easingRange, a, b)
}

export const getEasedValueAtTime = (tv, maxTime, a, b, easingFunction) => {
  const easingDomainBasedOnTime = fromEasingDomain(tv / maxTime, 0, 1)
  const easingRangeBasedOnTime = easingFunction(easingDomainBasedOnTime)
  return fromEasingDomain(easingRangeBasedOnTime, a, b)

}

export const linear = (v) => v
export const quadEaseIn = (v) => v * v
export const quadEaseOut = (v) => v * (2 - v)
export const cubicEaseInOut = (v) => -2*v*v*v + 3*v*v