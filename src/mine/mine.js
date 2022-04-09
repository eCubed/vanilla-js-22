import { generateRandomIntegerInclusive } from '../utils/randomutils.js'
import { getAdjacentCells } from '../utils/arrayutils.js'
import { isRMBClicked } from '../utils/mouseutils.js'
import { clearChildrenOfElement } from '../utils/domutils.js'
import { setupCountdown } from '../utils/countdown.js'

const NUM_ROWS = 10
const NUM_COLS = 15
const CELL_SIZE = 40

const NUM_BOMBS = 10
const NUM_SECS_TO_COMPLETE = 30

let cells = []

window.oncontextmenu = () => false

const { start: startCountdown, reset: resetCountdown, pause: stopCountdown } = setupCountdown(NUM_SECS_TO_COMPLETE, 1000,
  (counter) => {
    const countdownDisplayDiv = document.getElementById('countdown-display')
    countdownDisplayDiv.innerText = counter
  },
  () => {
    alert(`Times up. Sorry. You lost!`)
    manageGameLost()
  })


const createCells = () => {
  cells = []
  for(let r = 0; r < NUM_ROWS; r++) {
    const row = []
    for(let c = 0; c < NUM_COLS; c++) {
      row.push({ r, c, number: 0, isOpened: false, isBomb: false, isFlagged: false })
    }
    cells.push(row)
  }
}

const placeBombs = () => {
  for(let b = 0; b < NUM_BOMBS; b++) {
    let randomR = generateRandomIntegerInclusive(0, NUM_ROWS - 1)
    let randomC =  generateRandomIntegerInclusive(0, NUM_COLS - 1)

    while(cells[randomR][randomC].isBomb) {
      randomR = generateRandomIntegerInclusive(0, NUM_ROWS - 1)
      randomC =  generateRandomIntegerInclusive(0, NUM_COLS - 1)
    }

    cells[randomR][randomC].isBomb = true;
  }
}

const markNumbers = () => {
  for(let r = 0; r < NUM_ROWS; r++) {
    for(let c = 0; c < NUM_COLS; c++) {
      if (!cells[r][c].isBomb) {
        const adjacentCells = getAdjacentCells(cells, r, c)
        cells[r][c].number = adjacentCells.filter(cell => cell.isBomb).length
      }
    }
  }
}

const openCell = (cell) => {
  // guaranteed that cell is not a bomb and it's not opened
  cell.isOpened = true
  const cellDiv = document.getElementById(`cell-${cell.r}-${cell.c}`)
  cellDiv.style.backgroundColor = 'ccc'
  if (cell.number > 0) {
    cellDiv.innerText = cell.number
  } else {
    const adjacentCells = getAdjacentCells(cells, cell.r, cell.c).filter(cell => !cell.isOpened)
      adjacentCells.forEach(adjacentCell => {
          openCell(adjacentCell)
      })
  }
}

const toggleCellIsFlagged = (cell) => {
  if (!cell.isOpened) {

    cell.isFlagged = !cell.isFlagged
    const cellDiv = document.getElementById(`cell-${cell.r}-${cell.c}`)
    cellDiv.innerText = (cell.isFlagged) ? 'F': ''
    checkWin()
  }
}

const manageGameLost = (cell) => {
  // cell is a bomb that was clicked before getting into this function
  if (cell) {    
    const cellDiv = document.getElementById(`cell-${cell.r}-${cell.c}`)
    cellDiv.innerText = 'B'
    cellDiv.style.backgroundColor = '#990000'
  }

  // show all the bombs
  const bombCells = cells.flat().filter(c => c.isBomb)
  bombCells.forEach(bc => {
    const bombCellDiv = document.getElementById(`cell-${bc.r}-${bc.c}`)
    bombCellDiv.innerText = 'B'
  })
}


const renderCell = (cell) => {
  const cellDiv = document.createElement('div')
  cellDiv.classList.add('cell')
  cellDiv.setAttribute('id', `cell-${cell.r}-${cell.c}`)
  cellDiv.style.width = `${CELL_SIZE}px`
  cellDiv.style.height = `${CELL_SIZE}px`
  cellDiv.style.left = `${cell.c * CELL_SIZE}px`
  cellDiv.style.top = `${cell.r * CELL_SIZE}px`

  cellDiv.addEventListener('mousedown', (e) => {
    if (!cell.isOpened) {
      if (isRMBClicked(e)) {
        e.preventDefault()
        toggleCellIsFlagged(cell)
      } else {
        if (cell.isBomb) {
          manageGameLost(cell)
          stopCountdown()
        } else {
          openCell(cell)
        }
      }
    } 
  })

  return cellDiv
}

const renderMineField = () => {
  const mineFieldDiv = document.getElementById('mine-field')
  clearChildrenOfElement(mineFieldDiv)
  mineFieldDiv.style.width = `${NUM_COLS * CELL_SIZE}px`
  mineFieldDiv.style.height = `${NUM_ROWS * CELL_SIZE}px`
  for(let r = 0; r < NUM_ROWS; r++) {
    for(let c = 0; c < NUM_COLS; c++) {
      mineFieldDiv.appendChild(renderCell(cells[r][c]))
    }
  }  
}

const checkWin = () => {
  if (cells.flat().filter(cell => cell.isFlagged && cell.isBomb).length === NUM_BOMBS) {
    alert(`WON!!!`)
    stopCountdown()
  }
}

const reset = () => {
  createCells()
  placeBombs()
  markNumbers()
  renderMineField()
  resetCountdown()
  startCountdown()
}

reset()

const resetButton = document.getElementById('reset-button')
resetButton.addEventListener('click', () => {
  reset()
})
