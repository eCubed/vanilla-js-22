import { chooseRandomDistinctItemsFromArray, clearChildrenOfElement, scrambleArray } from '../utils/utils.js'

const NUM_CARDS = 8
const MAX_NUM_TRIES_WRONG = NUM_CARDS / 2
const numValues = NUM_CARDS / 2

const allValues = ['apple', 'banana', 'cherry', 'fig', 'orange', 'lemon', 'blueberry', 'grape']

let currentCardToMatchIndex
let numPairsMatched = 0
let numTriesWrong = 0
let currentGameState = 'IDLE' // other two are 'FIRST_CARD_OPENED', 'SECOND_CARD_OPENED'

let cards = []

const openCard = (card, cardDiv) => {
  card.isOpened = true
  cardDiv.style.backgroundColor = 'white';
  cardDiv.innerText = card.value
}

const closeCard = (card, cardDiv) => {
  card.isOpened = false
  cardDiv.style.backgroundColor = '#000055'
  cardDiv.innerText = ''
}

const checkWinStatus = () => {
  console.log(`tries: ${numTriesWrong}/${MAX_NUM_TRIES_WRONG}, matched: ${numPairsMatched}/${NUM_CARDS/2}`)
  
  if (numTriesWrong === MAX_NUM_TRIES_WRONG) {
    console.log(`LOSE`)
    alert(`Sorry. You Lost!!!`)
    resetGame()
  }

  if (numPairsMatched === NUM_CARDS / 2) {
    console.log(`WIN`)
    alert(`Alright! WIN!`)
    resetGame()
  }
}

const createCardDiv = (card, index) => {
  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card')
  cardDiv.setAttribute('id', `card-${index}`)
  cardDiv.style.backgroundColor = card.isOpened ? 'white' : '#000055'

  cardDiv.addEventListener('click', () => {
    if (!card.isOpened && numTriesWrong < MAX_NUM_TRIES_WRONG) {
      if (currentGameState === 'IDLE') {
        openCard(card, cardDiv)
        currentGameState = 'FIRST-CARD-OPENED'
        currentCardToMatchIndex = index
      } else if (currentGameState === 'FIRST-CARD-OPENED') {
        currentGameState = 'SECOND-CARD-OPENED'
        openCard(card, cardDiv)
        if (cards[currentCardToMatchIndex].value === card.value) {
          // There is a match!!!
          numPairsMatched++          
          console.log(`Match found`)
        } else {
          // Not a match!!!
          console.log('Not match!')
          numTriesWrong++
          setTimeout(() => {
            closeCard(card, cardDiv)
            closeCard(cards[currentCardToMatchIndex], document.getElementById(`card-${currentCardToMatchIndex}`)  )
          }, 1000)
        }

        checkWinStatus()
        currentGameState = 'IDLE'
      }
    }

  })

  return cardDiv
}

const layoutCards = () => {
  const tableTop = document.getElementById('table-top')
  cards.forEach((card, index) => {
    tableTop.appendChild(createCardDiv(card, index))
  })
}

const resetGame = () => {
  numPairsMatched = 0
  numTriesWrong = 0
  cards = []
  // Remove all of the children
  clearChildrenOfElement(document.getElementById('table-top'))
  let selectedValues = chooseRandomDistinctItemsFromArray(allValues, numValues)  
  let cardValues = [...selectedValues, ...selectedValues]  
  scrambleArray(cardValues)
  
  for(let i = 0; i < NUM_CARDS; i++) {
    cards.push({
      value: cardValues[i],
      isOpened: false
    })
  }
  layoutCards()
}

resetGame()