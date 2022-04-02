export const clearChildrenOfElement = (element) => {
  while(element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

