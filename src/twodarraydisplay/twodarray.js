const NUM_ITEMS_X = 6
const NUM_ITEMS_Y = 5
const GRID_ITEM_SIZE = 100

const itemData = []

const initiateItemData = () => {
  for(let j = 0; j < NUM_ITEMS_Y; j++) {
    const row = []
    for(let i = 0; i < NUM_ITEMS_X; i++) {
      row.push({ x: i, y: j})
    }
    itemData.push(row)
  }
}

const renderItemDiv = (x, y, k) => {
  const itemDiv = document.createElement('div')
  itemDiv.setAttribute('id', `item-${x}-${y}`)
  itemDiv.setAttribute('class', 'grid-item')
  itemDiv.innerText = `${x}, ${y}: ${k} ${JSON.stringify(itemData[y][x])}`
  itemDiv.style.left = `${GRID_ITEM_SIZE * x}px`
  itemDiv.style.top = `${GRID_ITEM_SIZE * y}px`

  itemDiv.addEventListener('mouseenter', (ev) => {
    const row = itemData[y]
    row.forEach(rowItem => {
      const itemDivInRow = document.getElementById(`item-${rowItem.x}-${rowItem.y}`)
      itemDivInRow.style.backgroundColor = 'lightGreen'
    })
  })

  itemDiv.addEventListener('mouseleave', (ev) => {
    const row = itemData[y]
    row.forEach(rowItem => {
      const itemDivInRow = document.getElementById(`item-${rowItem.x}-${rowItem.y}`)
      itemDivInRow.style.backgroundColor = 'white'
    })
  })
  
  return itemDiv
}

const renderItemDivs = () => {
  const grid = document.getElementById('grid')

  let k = 0;
  for(let j = 0; j < NUM_ITEMS_Y; j++) {
    for(let i = 0; i < NUM_ITEMS_X; i++) {
      grid.appendChild(renderItemDiv(i, j, k++))
    }
  }
}

initiateItemData()
renderItemDivs()
console.log(`${JSON.stringify(itemData)}`)