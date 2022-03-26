import { setupPanel  } from './panel.js';

setupPanel('panel-parent', 'Title of My Panel', null, () => {
  const contentP = document.createElement('p')
  contentP.innerText = 'This is my custom panel content'
  return contentP
})

setupPanel('panel-parent', 'Second Panel',
  (renderItemArgs) => {
    const customHeader = document.createElement(`div`)
    
    const togglerA = document.createElement('a')
    togglerA.addEventListener('click', () => { 
      renderItemArgs.toggleExpanded()      
    })

    renderItemArgs.expandedChanged = (isExpanded) => {
      console.log(`expandedHander....`)
      togglerA.innerText = isExpanded ? 'Contract' : 'Expand'
    }

    console.log(`Just finished setting onExpandedChanged`)
    customHeader.appendChild(togglerA)

    const titleSpan = document.createElement('span')
    titleSpan.innerText = renderItemArgs.title
    customHeader.appendChild(titleSpan)

    return customHeader
  },
  () => {
    const contentP = document.createElement('p')
    contentP.innerText = 'This is my second panel conent'
    return contentP
  })