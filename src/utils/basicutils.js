export const clamp = (min, max, v) => {
  if (v < min)
    return min
  else if (v > max)
    return max
  else
    return v
}