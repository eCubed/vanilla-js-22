const TILE_SIZE = 100
const NUM_ROWS = 4
const NUM_COLS = 4

/*
  tile = { sR: number, sC: number, cR: number, cC: number, label: string }
*/

let tiles = []
let blankTileCoordinates = { r: NUM_ROWS - 1, c: NUM_COLS - 1}

const renderTile = (tile) => {
  const tileDiv = document.createElement('div')
  tileDiv.setAttribute('id', `tile-${tile.sR}-${tile.sC}`)
  tileDiv.classList.add('tile')

  tileDiv.style.left = `${tile.cC * TILE_SIZE}px`
  tileDiv.style.top = `${tile.cR * TILE_SIZE}px`
  tileDiv.style.width = `${TILE_SIZE}px`
  tileDiv.style.height = `${TILE_SIZE}px`
  tileDiv.innerText = tile.label + ` (${tile.cR}, ${tile.cC})`

  tileDiv.addEventListener('click', () => {
    const adjTiles = getAdjacentTiles(tile)

    console.log(`Tile clicked: ${JSON.stringify(tile)}`)
    console.log(`adj tiles: ${JSON.stringify(adjTiles, null, 2)}`)
  })

  return tileDiv;
}

const createTiles = () => {
  tiles = []
  let label = 1
  for (let r = 0; r < NUM_ROWS; r++) {
    const row = []
    for (let c = 0; c < NUM_COLS; c++) {
      if (r < NUM_ROWS - 1 || c < NUM_COLS - 1) {
        const tile = { sR: r, sC: c, cR: r, cC: c, label: label}
        row.push(tile)
        label++
      }
    }
    tiles.push(row)
  }
}

const renderTiles = () => {
  const slidingPuzzle = document.getElementById('sliding-puzzle')
  slidingPuzzle.style.width = `${NUM_COLS * TILE_SIZE}px`
  slidingPuzzle.style.height = `${NUM_ROWS * TILE_SIZE}px`

  for (let r = 0; r < NUM_ROWS; r++) {
    for (let c = 0; c < NUM_COLS; c++) {
      if (r < NUM_ROWS - 1 || c < NUM_COLS - 1) {
        slidingPuzzle.appendChild(renderTile(tiles[r][c]))
      }
    }
  }
}

const getAdjacentTiles = (tile) => {
  const adjacentTiles = []
  let missingTileCoords
  let missingDirection

  // North
  if (tile.cR > 0) {
    if (tiles[tile.cR - 1][tile.cC] == null) {
      missingTileCoords = { r: tile.cR - 1, c: tile.cC }
      missingDirection = 'N'
    } else {
      adjacentTiles.push(tiles[tile.cR - 1][tile.cC])
    }
  }

  // South
  if (tile.cR < NUM_ROWS - 1) {
    if (tiles[tile.cR + 1][tile.cC] == null) {
      missingTileCoords = { r: tile.cR + 1, c: tile.cC }
      missingDirection = 'S'
    } else {
      adjacentTiles.push(tiles[tile.cR + 1][tile.cC])
    }
  }

  // East
  if (tile.cC < NUM_COLS - 1) {
    if (tiles[tile.cR][tile.cC + 1] == null) {
      missingTileCoords = { r: tile.cR, c: tile.cC + 1 }
      missingDirection = 'E'
    } else {
      adjacentTiles.push(tiles[tile.cR][tile.cC + 1])
    }
  }

  // West
  if (tile.cC > 0) {
    if (tiles[tile.cR][tile.cC - 1] == null) {
      missingTileCoords = { r: tile.cR, c: tile.cC - 1 }
      missingDirection = 'W'
    } else {
      adjacentTiles.push(tiles[tile.cR][tile.cC - 1])
    }
  }

  return { adjacentTiles, missingTileCoords, missingDirection }
}

const resetPuzzle = () => {
  createTiles()
  renderTiles()
}

const checkWin = () => {

}


resetPuzzle()