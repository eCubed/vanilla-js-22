import { setupMidiAccess } from '../utils/midiutils.js'

const KEY_WIDTH = 30
const KEY_HEIGHT = 150

const keyboardDiv = document.getElementById('keyboard')
keyboardDiv.style.width = `${KEY_WIDTH * 52}px`
keyboardDiv.style.height = `${KEY_HEIGHT}px`

const isBlackKey = (midiNumber) => [2, 5, 7, 10, 0].includes((midiNumber - 20) % 12)

const isAfterBlackKey = (midiNumber) => [3, 6, 8, 11, 1].includes((midiNumber - 20) % 12)

const { noteOutOn, noteOutOff } = setupMidiAccess((midiNumber) => {
  const keyDiv = document.getElementById(`key-${midiNumber}`)
  keyDiv.style.backgroundColor = '#ffaaaa'
}, midiNumber => {
  const keyDiv = document.getElementById(`key-${midiNumber}`)
  keyDiv.style.backgroundColor = isBlackKey(midiNumber) ? 'black' : 'white'
})

const renderKey = (midiNumber) => {
  const keyDiv = document.createElement('div')
  keyDiv.setAttribute('id', `key-${midiNumber}`);
  keyDiv.classList.add('key')
 
  keyDiv.style.backgroundColor = isBlackKey(midiNumber) ? 'black' : 'white'
  keyDiv.style.height = isBlackKey(midiNumber) ? `${KEY_HEIGHT * 2/3}px` : `${KEY_HEIGHT}`
  keyDiv.style.marginLeft = isBlackKey(midiNumber) || isAfterBlackKey(midiNumber) ? `${-1/4 * KEY_WIDTH}px`:  '0px'
  keyDiv.style.zIndex = isBlackKey(midiNumber) ? 10 : 1
  keyDiv.style.width = isBlackKey(midiNumber) ? `${KEY_WIDTH / 2}px` : `${KEY_WIDTH}px`

  keyDiv.addEventListener('mousedown', () => {
    keyDiv.style.backgroundColor = '#ffaaaa'
    console.log(`midi-note: ${midiNumber}`)
    noteOutOn(midiNumber, 64)
  })

  keyDiv.addEventListener('mouseup', () => {
    keyDiv.style.backgroundColor = isBlackKey(midiNumber) ? 'black' : 'white'
    noteOutOff(midiNumber)
  })

  return keyDiv
}

const renderKeyboard = () => {
  for(let i = 21; i <= 108; i++) {
    keyboardDiv.appendChild(renderKey(i))
  }
}

renderKeyboard()

