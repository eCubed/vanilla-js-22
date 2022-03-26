export const setupPanel = (panelParentId, title, renderHeading, renderContent) => {
  let _renderHeadingArgs = {
    expandedChanged: null,
    toggleExpanded: null,
    title: title
  }
  
  const panelParent = document.getElementById(panelParentId)
  const content = renderContent()

  let isExpanded = true
  const toggleExpanded = () => {
    isExpanded = !isExpanded    
    isExpanded ? panel.appendChild(content) : panel.removeChild(content)
    _renderHeadingArgs.expandedChanged?.call(this, isExpanded)
  }
  _renderHeadingArgs.toggleExpanded = toggleExpanded


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
    panel.appendChild(renderHeading(_renderHeadingArgs))
    console.log(_renderHeadingArgs.expandedChanged)
    _renderHeadingArgs.expandedChanged?.call(this, isExpanded)
  }
 
  panel.appendChild(content)

  panelParent.appendChild(panel)
}