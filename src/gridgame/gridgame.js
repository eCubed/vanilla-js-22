const NUM_COLS = 4
const NUM_ROWS = 3
const CELL_SIZE = 100
const GAP = 5

let cells = []
let edges = []

/*
  Cell structure: { col: number, row: number, ownedBy: string}
  Edge structure: { cells: Cell[], markedBy: string, orientation: string (h or v) }
*/

const createInitialCells = () => {
  cells = []
  for(let r = 0; r < NUM_ROWS; r++) {
    const row = []
    for(let c = 0; c < NUM_COLS; c++) {
      row.push({
        col: c,
        row: r,
        ownedBy: ''
      })
    }
    cells.push(row)
  }
}

const createInitialEdges = () => {
  edges = []
  /* Fill the vertical edges first */
  for (let r = 0; r < NUM_ROWS; r++) {
    // create left-most edge first
    const firstEdge = { cells: [], markedBy: "", orientation: 'v' }
    firstEdge.cells.push(cells[r][0])
    edges.push(firstEdge)
    for (let c = 1; c < NUM_COLS; c++) {
      const edge = { cells: [], markedBy: "", orientation: 'v' }
      edge.cells.push(cells[r][c-1])
      edge.cells.push(cells[r][c])
      edges.push(edge)
    }
    const lastEdge = { cells: [], markedBy: "", orientation: 'v' }
    lastEdge.cells.push(cells[r][NUM_COLS - 1])
    edges.push(lastEdge)
  }

  /* The fill the horizontal edges next */
  for (let c = 0; c < NUM_COLS; c++) {
    const firstEdge = { cells: [], markedBy: "", orientation: 'h' }
    firstEdge.cells.push(cells[0][c])
    edges.push(firstEdge)
    for (let r = 1; r < NUM_ROWS; r++) {
      const edge = { cells: [], markedBy: "", orientation: 'h' }
      edge.cells.push(cells[r][c])
      edge.cells.push(cells[r-1][c])
      edges.push(edge)
    }
    const lastEdge = { cells: [], markedBy: "", orientation: 'h' }
    lastEdge.cells.push(cells[NUM_ROWS-1][c])
    edges.push(lastEdge)
  }
}

const renderCell = (cell) => {
  const cellDiv = document.createElement('div')
  cellDiv.classList.add('cell')
  cellDiv.setAttribute('id', `cell-${cell.row}-${cell.col}`)

  // Now, we physically position the cells.
  cellDiv.style.width = `${CELL_SIZE}px`
  cellDiv.style.height = `${CELL_SIZE}px`
  cellDiv.style.left = `${cell.col * (CELL_SIZE + GAP) + GAP }px`
  cellDiv.style.top = `${cell.row * (CELL_SIZE + GAP) + GAP }px`
  cellDiv.innerText = `${cell.col}, ${cell.row}`
  return cellDiv
}

const renderCells = () => {
  // First, fix the dimensions of the grid, in pixels
  const gridDiv = document.getElementById('grid')
  gridDiv.style.width = `${NUM_COLS * CELL_SIZE + (NUM_COLS + 1) * GAP }px`
  gridDiv.style.height = `${NUM_ROWS * CELL_SIZE + (NUM_ROWS + 1) * GAP }px`

  // Now, add the cells
  for (let r = 0; r < NUM_ROWS; r++) {
    for (let c = 0; c < NUM_COLS; c++) {
      gridDiv.appendChild(renderCell(cells[r][c]))
    }
  }
}

const renderEdge = (edge) => {
  const edgeDiv = document.createElement('div')

  if (edge.orientation === 'v') {
    edgeDiv.style.width = `${GAP}px`
    edgeDiv.style.height = `${CELL_SIZE}px`

    const cellForEdgePositioning = edge.cells[edge.cells.length - 1]
    
    
  } else {

  }
  
  edgeDiv.addEventListener('click', () => {

    manageGameStatus()
  })
  return edgeDiv;
}

const renderEdges = () => {
  const gridDiv = document.getElementById('grid')
  for(let e = 0; e < edges.length; e++) {
    gridDiv.appendChild(renderEdge(edges[e]))
  }
}

const manageGameStatus = () => {
  // keep score, detect cells that have already been owned, etc.
}


const resetGame = () => {
  createInitialCells()
  createInitialEdges()
  renderCells()
  renderEdges()
}


resetGame()