import { clearChildrenOfElement } from '../utils/utils.js'

const NUM_COLS = 4
const NUM_ROWS = 3
const CELL_SIZE = 100
const GAP = 5

let cells = []
let edges = []
let players = []
let currentPlayer

/*
  Cell structure: { col: number, row: number, ownedBy: string}
  Edge structure: { cells: Cell[], markedBy: string, orientation: string (h or v) }
  Player structure: { name: string, index: number, color: string}
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

  console.log(`Number of cells in createInitialCells end: ${cells.length}`)
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
      
      edge.cells.push(cells[r-1][c])
      edge.cells.push(cells[r][c])
      edges.push(edge)
    }
    const lastEdge = { cells: [], markedBy: "", orientation: 'h' }
    lastEdge.cells.push(cells[NUM_ROWS-1][c])
    edges.push(lastEdge)
  }
}

const createPlayers = () => {
  players = []
  players.push({
    name: 'Player 1',
    index: 0,
    color: `#990000`,
    score: 0
  })
  players.push({
    name: 'Player 2',
    index: 1,
    color: `#009900`,
    score: 0
  })
  players.push({
    name: 'Player 3',
    index: 2,
    color: `#000099`,
    score: 0
  })
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

const updateScoreboard = (player) => {
  // find the scoreboard part associated with player, then update the score!
  const playerScoreDiv = document.getElementById(`player-${player.index}-score`)
  playerScoreDiv.innerText = player.score
}

const checkGameDone = () => {
  // Game is done when all of the cells are taken!
  if ([].concat(...cells).filter(c => c.ownedBy !== '').length === NUM_COLS * NUM_ROWS) {
    // alert(`Game Done!!!`)

    // Who are the winner[s]
    const rankedPlayers = players.sort((a, b) => b.score - a.score)

    if (rankedPlayers[0].score === rankedPlayers[1].score) {
      alert(`Game done! We have a tie between ${rankedPlayers[0].name} and ${rankedPlayers[1].name}!!!`)
    } else {
      alert(`Game done! The winner is ${rankedPlayers[0].name}`)
    }
  }
}

// Happens only when a user clicks on edge
const manageAnyTakenCells = (edge) => {

  edge.cells.forEach(cellOfEdge => {
    // Find ALL of the edges that contain this cell, and all of those edges
    // Have to be marked
    
    if (edges.filter(e => e.cells.filter(c => c === cellOfEdge).length > 0 && e.markedBy !== '').length === 4) {
      
      cellOfEdge.ownedBy = currentPlayer.name
      const cellDiv = document.getElementById(`cell-${cellOfEdge.row}-${cellOfEdge.col}`)
      cellDiv.innerText = currentPlayer.name
      currentPlayer.score++
      updateScoreboard(currentPlayer)
      checkGameDone()
    }

  })
}

const clickOnEdge = (edge, edgeDiv) => {
  // The current player will own it!
  if (edge.markedBy === '') {
    edge.markedBy = currentPlayer.name
    
    edgeDiv.style.backgroundColor = currentPlayer.color
    edgeDiv.style.cursor = 'default'
    // Now, examine if the cells associated with the edges have been totally surrounded
    // Then do proper data updating and logic.
    manageAnyTakenCells(edge)
    advanceTurn()
  }
}

const renderEdge = (edge) => {
  const edgeDiv = document.createElement('div')
  edgeDiv.classList.add('edge')
  const cellForEdgePositioning = edge.cells[edge.cells.length - 1]
  
  if (edge.orientation === 'v') {
    edgeDiv.setAttribute('id', `edge-${edge.orientation}-${cellForEdgePositioning.row}-${cellForEdgePositioning.col}`)

    edgeDiv.style.width = `${GAP}px`
    edgeDiv.style.height = `${CELL_SIZE}px`

    if (edge.cells.length === 1 && cellForEdgePositioning.col === NUM_COLS - 1) {
      edgeDiv.style.left = `${NUM_COLS * (CELL_SIZE + GAP)}px`
      edgeDiv.setAttribute('id', `edge-${edge.orientation}-${cellForEdgePositioning.row}-${cellForEdgePositioning.col + 1}`)

    } else {
      edgeDiv.style.left = `${cellForEdgePositioning.col * (CELL_SIZE + GAP)}px`
    }

    edgeDiv.style.top = `${GAP + cellForEdgePositioning.row * (CELL_SIZE + GAP) }px`   

  } else {
    edgeDiv.setAttribute('id', `edge-${edge.orientation}-${cellForEdgePositioning.row}-${cellForEdgePositioning.col}`)

    edgeDiv.style.width = `${CELL_SIZE}px`
    edgeDiv.style.height = `${GAP}px`
    console.log(`${JSON.stringify(edge.cells)}`)

    if (edge.cells.length === 1 && cellForEdgePositioning.row === NUM_ROWS - 1) {
      edgeDiv.style.top = `${NUM_ROWS * (CELL_SIZE + GAP)}px`
      edgeDiv.setAttribute('id', `edge-${edge.orientation}-${cellForEdgePositioning.row + 1}-${cellForEdgePositioning.col}`)
    } else {
      edgeDiv.style.top = `${cellForEdgePositioning.row * (CELL_SIZE + GAP)}px`
      
    }
    edgeDiv.style.left = `${GAP + cellForEdgePositioning.col * (CELL_SIZE + GAP)}px`
  }
  
  edgeDiv.addEventListener('click', () => {
    clickOnEdge(edge, edgeDiv)
  })
  return edgeDiv;
}

const renderEdges = () => {
  const gridDiv = document.getElementById('grid')
  for(let e = 0; e < edges.length; e++) {
    gridDiv.appendChild(renderEdge(edges[e]))
  }
}

const advanceTurn = () => {
  currentPlayer = players[(currentPlayer.index + 1) % 3]
}

const renderPlayerEntryInScoreboard = (player) => {
  const playerDiv = document.createElement('div')
  playerDiv.setAttribute('id',`player-${player.index}`)
  playerDiv.classList.add('player-entry')

  const playerNameDiv = document.createElement('div')
  playerNameDiv.innerText = player.name
  playerDiv.appendChild(playerNameDiv)

  const playerScoreDiv = document.createElement('div')
  playerScoreDiv.setAttribute('id', `player-${player.index}-score`)
  playerScoreDiv.innerText = player.score
  playerDiv.appendChild(playerScoreDiv)

  return playerDiv
}

const renderScoreboard = () => {
  const scoreBoardDiv = document.getElementById('scoreboard')
  clearChildrenOfElement(scoreBoardDiv)

  players.forEach(player => {
    scoreBoardDiv.appendChild(renderPlayerEntryInScoreboard(player))
  })

  const resetButton = document.createElement('button')
  resetButton.innerText = 'Reset'
  resetButton.addEventListener('click', () => {
    resetGame()
  })
  
  scoreBoardDiv.appendChild(resetButton)
}


const resetGame = () => {
  clearChildrenOfElement(document.getElementById('grid'))
  createPlayers()
  renderScoreboard()
  currentPlayer = players[0]
  createInitialCells()
  createInitialEdges()
  renderCells()
  renderEdges()
}


resetGame()