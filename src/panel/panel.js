export const setupPanel = (panelParentId, title, renderHeading, renderContent) => {
  const panelParent = document.getElementById(panelParentId)
  const content = renderContent()

  let isExpanded = true
  const toggleExpanded = () => {
    isExpanded = !isExpanded    
    isExpanded ? panel.appendChild(content) : panel.removeChild(content)
  }

  const getIsExpanded = () => {
    return isExpanded
  }

  const panel = document.createElement('div')

  if (renderHeading === null) {
    const heading = document.createElement('div')
    const titleSpan = document.createElement('span')
    titleSpan.innerText = title
    heading.appendChild(titleSpan)
    const toggleButton = document.createElement('button')
    toggleButton.innerText = 'X'
    toggleButton.addEventListener('click', () => {
      toggleExpanded()
    })
    heading.appendChild(toggleButton)    
    panel.appendChild(heading)
  } else {
    console.log(`There is a custom renderHeading function`)
    panel.appendChild(renderHeading(title, getIsExpanded, toggleExpanded))
  }
 
  panel.appendChild(content)

  panelParent.appendChild(panel)
}