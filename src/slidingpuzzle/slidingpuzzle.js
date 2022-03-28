import { chooseRandomItemFromArray } from '../utils/utils.js'

const TILE_SIZE = 100
const NUM_ROWS = 4
const NUM_COLS = 4

/*
  tile = { sR: number, sC: number, cR: number, cC: number, label: string }
*/

let tiles = []

const moveTile = (tile, tileDiv, newCoords) => {
  tile.cR = newCoords.r,
  tile.cC = newCoords.c
  tileDiv.style.left = `${tile.cC * TILE_SIZE}px`
  tileDiv.style.top = `${tile.cR * TILE_SIZE}px`
  tileDiv.innerText = `${tile.label} (${tile.cR}, ${tile.cC})`
}

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
    const missingTileCoords = getMissingTileCoords(tile)

    if (missingTileCoords !== null) {
      moveTile(tile, tileDiv, missingTileCoords)
      checkWin()
    }
  })

  return tileDiv;
}

const findMissingTileCoords = () => {
  for (let r = 0; r < NUM_ROWS; r++) {    
    for (let c = 0; c < NUM_COLS; c++) {
      if ([].concat(...tiles).find(t => t.cR === r && t.cC === c) == null) {
        return { c, r }
      }
    }
  }

  return null
}

const getAdjacentTilesToCoords = (coords) => {
  const adjacentTileCoords = []
  // North
  const northTile = [].concat(...tiles).find(t => t.cR === coords.r - 1 && t.cC === coords.c)
  if (coords.r > 0 && northTile != null)
    adjacentTileCoords.push({ r: coords.r - 1, c: coords.c });

  // South
  const southTile = [].concat(...tiles).find(t => t.cR === coords.r + 1 && t.cC === coords.c)
  if (coords.r < NUM_ROWS - 1 && southTile != null)
    adjacentTileCoords.push({ r: coords.r + 1, c: coords.c });

  // East
  const eastTile = [].concat(...tiles).find(t => t.cR === coords.r && t.cC === coords.c + 1)
  if (coords.c < NUM_COLS - 1 && eastTile != null)
    adjacentTileCoords.push({ r: coords.r, c: coords.c + 1 });

  // West
  const westTile = [].concat(...tiles).find(t => t.cR === coords.r && t.cC === coords.c - 1)
  if (coords.c > 0 && westTile != null)
    adjacentTileCoords.push({ r: coords.r, c: coords.c - 1 });

  return adjacentTileCoords 
}

const scrambleTiles = () => {
  for(let i = 0; i < NUM_COLS * NUM_ROWS * 2; i++) {
    const missingTileCoords = findMissingTileCoords()
    const adjacentTiles = getAdjacentTilesToCoords(missingTileCoords)
    const randomAdjacentTileCoords = chooseRandomItemFromArray(adjacentTiles)
    const tile = [].concat(...tiles).find(t => t.sR === randomAdjacentTileCoords.r && t.sC === randomAdjacentTileCoords.c)
    if (tile != null) {
      moveTile(
        tile, 
        document.getElementById(`tile-${randomAdjacentTileCoords.r}-${randomAdjacentTileCoords.c}`),
        missingTileCoords)
    }
    
  }
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

const getMissingTileCoords = (tile) => {

  // North
  const northTile = [].concat(...tiles).find(t => t.cR === tile.cR - 1 && t.cC === tile.cC)
  if (tile.cR > 0 && northTile == null)
    return { r: tile.cR - 1, c: tile.cC }

  // South
  const southTile = [].concat(...tiles).find(t => t.cR === tile.cR + 1 && t.cC === tile.cC)
  if (tile.cR < NUM_ROWS - 1 && southTile == null)
    return { r: tile.cR + 1, c: tile.cC }

  // East
  const eastTile = [].concat(...tiles).find(t => t.cR === tile.cR && t.cC === tile.cC + 1)
  if (tile.cC < NUM_COLS - 1 && eastTile == null)
    return { r: tile.cR, c: tile.cC + 1 }
  
  // West
  const westTile = [].concat(...tiles).find(t => t.cR === tile.cR && t.cC === tile.cC - 1)
  if (tile.cC > 0 && westTile == null)
    return { r: tile.cR, c: tile.cC - 1 }
  
  return null
}

const resetPuzzle = () => {
  createTiles()
  renderTiles()
  scrambleTiles()
}

const checkWin = () => {
  if([].concat(...tiles).filter(t => t.cR == t.sR && t.cC === t.sC).length === (NUM_ROWS * NUM_COLS - 1)) {
    alert(`Win!!!`)
  } 
}


resetPuzzle()