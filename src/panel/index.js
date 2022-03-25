import { setupPanel  } from './panel.js';

setupPanel('panel-parent', 'Title of My Panel', null, () => {
  const contentP = document.createElement('p')
  contentP.innerText = 'This is my custom panel content'
  return contentP
})

setupPanel('panel-parent', 'Second Panel',
  (title, getIsExpanded, toggleExpanded) => {
    const customHeader = document.createElement(`div`)

    const togglerA = document.createElement('a')
    togglerA.addEventListener('click', () => { 
      toggleExpanded()
      togglerA.innerText = getIsExpanded() ? 'Contract' : 'Expand'
    })
    togglerA.innerText = getIsExpanded() ? 'Contract' : 'Expand'
    customHeader.appendChild(togglerA)

    const titleSpan = document.createElement('span')
    titleSpan.innerText = title
    customHeader.appendChild(titleSpan)

    return customHeader
  },
  () => {
    const contentP = document.createElement('p')
    contentP.innerText = 'This is my second panel conent'
    return contentP
  })