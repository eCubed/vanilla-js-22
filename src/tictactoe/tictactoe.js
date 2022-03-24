const players = [
  { name: 'Player 1', mark: "X", score: 0},
  { name: 'Player 2', mark: "0", score: 0}
]

let whoseTurn = 0

let tileData = []

const resetTiles = () => {
  tileData = []
  for(let i = 0; i < 3; i++) {
    const row = []
    for(let j = 0; j < 3; j++) {
      row.push('')
    }
    tileData.push(row)
  }
}

const markAndManageTurn = (tileDiv, x, y) => {
  
  if (tileData[x][y] === '') {
    tileData[x][y] = players[whoseTurn].mark
    tileDiv.innerText = tileData[x][y]
    console.log(JSON.stringify(tileData))
    if (!checkWin(whoseTurn)) {
      switchTurns()
    } else {
      /* Prompt who the winner is */
    }
  }
}

const drawTile = (x, y) => {
  const tileDiv = document.createElement('div')
  tileDiv.setAttribute('id',`tile-${x}-${y}`)
  tileDiv.setAttribute('class', 'tile')
  tileDiv.innerText = tileData[x][y]
  tileDiv.style.left = `${102 * y }px`
  tileDiv.style.top = `${102 * x }px`

  tileDiv.addEventListener("click", () => {
    markAndManageTurn(tileDiv, x, y)
  })

  return tileDiv
}

const drawTiles = () => {
  const gameBoardDiv = document.getElementById("game-board");
  if (gameBoardDiv == null)
    console.log(`gameBoardDiv is null`)

  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {      
      gameBoardDiv.appendChild(drawTile(i, j))
    }
  }
}

const switchTurns = () => {
  whoseTurn = whoseTurn === 0 ? 1 : 0
}

const initializeGame = () => {
  resetTiles()
  drawTiles()
  updateScoreDisplay()
  document.getElementById('reset-button').addEventListener('click', resetGame);
}

const highlightWinningTiles = (winningTiles) => {
  winningTiles.forEach(tileDiv => {
    tileDiv.style.backgroundColor ='green'
  })
}

const updateDisplayForWin = (winningTiles) => {
  highlightWinningTiles(winningTiles)
  updateScoreDisplay()
  // enable the button
  document.getElementById('reset-button').disabled = false
}

const checkWin = (whoJustMadeAMove) => {
  if (tileData[0][0] === tileData[0][1] &&
      tileData[0][1] === tileData[0][2] &&
      tileData[0][0] !== '' &&
      tileData[0][1] !== '' &&
      tileData[0][2] !== '') {
    players[whoJustMadeAMove].score++;
    updateDisplayForWin([
      document.getElementById("tile-0-0"),
      document.getElementById("tile-0-1"),
      document.getElementById("tile-0-2")
    ])
    return true
  }

  if (tileData[1][0] === tileData[1][1] &&
    tileData[1][1] === tileData[1][2] &&
    tileData[1][0] !== '' &&
    tileData[1][1] !== '' &&
    tileData[1][2] !== '') {
    players[whoJustMadeAMove].score++;
    updateDisplayForWin([
      document.getElementById("tile-1-0"),
      document.getElementById("tile-1-1"),
      document.getElementById("tile-1-2")
  ])
  return true
}

if (tileData[2][0] === tileData[2][1] &&
  tileData[2][1] === tileData[2][2] &&
  tileData[2][0] !== '' &&
  tileData[2][1] !== '' &&
  tileData[2][2] !== '') {
  players[whoJustMadeAMove].score++;
  updateDisplayForWin([
    document.getElementById("tile-2-0"),
    document.getElementById("tile-2-1"),
    document.getElementById("tile-2-2")
  ])
  return true
}

if (tileData[0][0] === tileData[1][0] &&
  tileData[2][0] === tileData[0][0] &&
  tileData[0][0] !== '' &&
  tileData[1][0] !== '' &&
  tileData[2][0] !== '') {
  players[whoJustMadeAMove].score++;
  updateDisplayForWin([
    document.getElementById("tile-0-0"),
    document.getElementById("tile-1-0"),
    document.getElementById("tile-2-0")
  ])
  return true
}

if (tileData[0][1] === tileData[1][1] &&
  tileData[2][1] === tileData[0][1] &&
  tileData[0][1] !== '' &&
  tileData[1][1] !== '' &&
  tileData[2][1] !== '') {
  players[whoJustMadeAMove].score++;
  updateDisplayForWin([
    document.getElementById("tile-0-1"),
    document.getElementById("tile-1-1"),
    document.getElementById("tile-2-1")
  ])
  return true
}

if (tileData[0][2] === tileData[1][2] &&
  tileData[2][2] === tileData[0][2] &&
  tileData[0][2] !== '' &&
  tileData[1][2] !== '' &&
  tileData[2][2] !== '') {
  players[whoJustMadeAMove].score++;
  updateDisplayForWin([
    document.getElementById("tile-0-2"),
    document.getElementById("tile-1-2"),
    document.getElementById("tile-2-2")
  ])
  return true
}

if (tileData[0][0] === tileData[1][1] &&
  tileData[2][2] === tileData[0][0] &&
  tileData[0][0] !== '' &&
  tileData[1][1] !== '' &&
  tileData[2][2] !== '') {
  players[whoJustMadeAMove].score++;
  updateDisplayForWin([
    document.getElementById("tile-0-0"),
    document.getElementById("tile-1-1"),
    document.getElementById("tile-2-2")
  ])
  return true
}

if (tileData[0][2] === tileData[1][1] &&
  tileData[1][1] === tileData[2][0] &&
  tileData[0][2] !== '' &&
  tileData[1][1] !== '' &&
  tileData[2][0] !== '') {
  players[whoJustMadeAMove].score++;
  updateDisplayForWin([
    document.getElementById("tile-0-2"),
    document.getElementById("tile-1-1"),
    document.getElementById("tile-2-0")
  ])
  return true
}


  return false
}

const updateScoreDisplay = () => {
  const player1Div = document.getElementById('player-1-score')
  const player2Div = document.getElementById('player-2-score')

  player1Div.innerText = `${players[0].name}: ${players[0].score}`
  player2Div.innerText = `${players[1].name}: ${players[1].score}`
}

const resetGame = () => {
  resetTiles()
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {      
      const tileDiv = document.getElementById(`tile-${i}-${j}`)
      tileDiv.style.backgroundColor = 'white'
      tileDiv.innerText = ''
    }
  }
  document.getElementById('reset-button').disabled = true
}

initializeGame()
