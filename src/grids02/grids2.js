const NUM_ROWS = 5
const NUM_COLS = 7
const CELL_SIZE = 80

const gridDiv = document.getElementById('grid')
gridDiv.style.width = `${NUM_COLS * CELL_SIZE}px`;
gridDiv.style.height = `${NUM_ROWS * CELL_SIZE}px`;

const cellData = []

const populateCellData = () => {
  let order = 1;
  for (let r = 0; r < NUM_ROWS; r++) {
    const row = []
    for (let c= 0; c < NUM_COLS; c++) {
      row.push({ r, c, order })
      order++
    }
    cellData.push(row)
  }
}

const colorCell = (r, c, color) => {
  const cellDiv = document.getElementById(`cell-${r}-${c}`)
  cellDiv.style.backgroundColor = color
}

const getAdjacentCells = (r, c) => {
  const adjacentCellData = []
  for (let j = r - 1; j <= r + 1; j++) {
    for (let i = c - 1; i <= c + 1; i++) {
      if((0 <= j && j< NUM_ROWS && 0 <= i && i < NUM_COLS) && (i != c || j != r)) {
        adjacentCellData.push(cellData[j][i])
      }
    }
  }
  return adjacentCellData
}


const renderCell = (singleCellData) => {
  const cellDiv = document.createElement('div')
  cellDiv.classList.add('cell')
  cellDiv.setAttribute('id', `cell-${singleCellData.r}-${singleCellData.c}`)
  cellDiv.style.width = `${CELL_SIZE}px`
  cellDiv.style.height = `${CELL_SIZE}px`
  cellDiv.style.left = `${CELL_SIZE * singleCellData.c}`
  cellDiv.style.top = `${CELL_SIZE * singleCellData.r}`
  cellDiv.innerText = `(${singleCellData.r}, ${singleCellData.c}), ${singleCellData.order}`

  cellDiv.addEventListener('mouseenter', () => {
    colorCell(singleCellData.r, singleCellData.c, 'green')
    const adjacentCellData = getAdjacentCells(singleCellData.r, singleCellData.c)
    adjacentCellData.forEach(singleAdjacentCell => 
      colorCell(singleAdjacentCell.r, singleAdjacentCell.c, 'lightgreen')
    )
    
  })

  cellDiv.addEventListener('mouseleave', () => {
    colorCell(singleCellData.r, singleCellData.c, 'white')
    const adjacentCellData = getAdjacentCells(singleCellData.r, singleCellData.c)
    adjacentCellData.forEach(singleAdjacentCell => 
      colorCell(singleAdjacentCell.r, singleAdjacentCell.c, 'white')
    )
  })

  return cellDiv
}

const renderCells = () => {
  for (let r = 0; r < NUM_ROWS; r++) {    
    for (let c= 0; c < NUM_COLS; c++) {
      gridDiv.appendChild(renderCell(cellData[r][c]))
    }
  }
}

populateCellData()
renderCells()