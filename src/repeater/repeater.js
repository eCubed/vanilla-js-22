export const setupRepeater = (repeaterParentId, items, renderItem) => {
  const repeaterParent = document.getElementById(repeaterParentId)
  while (repeaterParent.firstChild) {
    repeaterParent.removeChild(repeaterParent.firstChild);
  }

  items.forEach((item, index) => {    
    repeaterParent.appendChild(renderItem(item, index))
  })
}