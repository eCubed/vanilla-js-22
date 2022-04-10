import { setupMidiAccess } from './midi.js'

const KEY_WIDTH = 30
const KEY_HEIGHT = 150


const { noteOutOn, noteOutOff } = setupMidiAccess((midiNote) => {
  const keyNumber88 = convertMidiNoteNumberToKeyNumber88(midiNote)
  const keyDiv = document.getElementById(`key-${keyNumber88}`)
  keyDiv.style.backgroundColor = '#ffcccc'
}, (midiNote) => {
  const keyNumber88 = convertMidiNoteNumberToKeyNumber88(midiNote)
  const keyDiv = document.getElementById(`key-${keyNumber88}`)
  keyDiv.style.backgroundColor =  isBlackKey(keyNumber88) ? 'black' : 'white'
})


const keyboardDiv = document.getElementById('keyboard')
keyboardDiv.style.width = `${KEY_WIDTH * 52}px`
keyboardDiv.style.height = `${KEY_HEIGHT}px`

const isBlackKey = (noteNumber) => {
  switch(noteNumber % 12) {
    case 2: return true
    case 5: return true
    case 7: return true
    case 10: return true
    case 0: return true
    default: return false
  }
}

const isWhiteScoot = (noteNumber) => {
  switch(noteNumber % 12) {
    case 3: return true
    case 6: return true
    case 8: return true
    case 11: return true
    case 1: return true
    default: return false
  }
}

const renderKey = (noteNumber, pianoKeyDown, pianoKeyUp) => {
  const keyDiv = document.createElement('div')
  keyDiv.classList.add('key')
  keyDiv.setAttribute('id', `key-${noteNumber}`)

  keyDiv.style.backgroundColor = isBlackKey(noteNumber) ? 'black' : 'white'
  keyDiv.style.height = isBlackKey(noteNumber) ? `${KEY_HEIGHT * 2/3}px` : `${KEY_HEIGHT}`
  keyDiv.style.marginLeft = isBlackKey(noteNumber) || isWhiteScoot(noteNumber) ?`${-1/4 * KEY_WIDTH}px`:  '0px'
  keyDiv.style.zIndex = isBlackKey(noteNumber) ? 10 : 1
  keyDiv.style.width = isBlackKey(noteNumber) ? `${KEY_WIDTH / 2}px` : `${KEY_WIDTH}px`

  keyDiv.addEventListener('mousedown', () => {
    keyDiv.style.backgroundColor = '#ffcccc'
    pianoKeyDown?.call(null, noteNumber)
  })

  keyDiv.addEventListener('mouseup', () => {
    keyDiv.style.backgroundColor = isBlackKey(noteNumber) ? 'black' : 'white'
    pianoKeyUp?.call(null, noteNumber)
  })

  return keyDiv
}

const onPianoKeyDown = (key88number) => {
  noteOutOn(convertKeyNumber88ToMidiNoteNumber(key88number), 64)
}

const onPianoKeyUp = (key88number) => {
  noteOutOff(convertKeyNumber88ToMidiNoteNumber(key88number), 0)
}

const renderKeyboard = () => {
  for (let k = 1; k <= 88; k++) {
    keyboardDiv.appendChild(renderKey(k, onPianoKeyDown, onPianoKeyUp))
  }
}

renderKeyboard()

const convertKeyNumber88ToNoteName = (keyNumber88) => {
  // We'll do them in Sharps for Simplicity
  const octave = (keyNumber88 <= 3) ? 0 : Math.floor((keyNumber88 - 4) / 12) + 1
  const noteLookup = ['A','Bb','B','C','C#','D','Eb','E','F','F#','G','Ab']
  const noteName = noteLookup[(keyNumber88-1) % 12]

  return `${noteName}${octave}`
}

const convertKeyNumber88ToMidiNoteNumber = (keyNumber88) => keyNumber88 + 20

const convertMidiNoteNumberToKeyNumber88 = (midiNoteNumber) => midiNoteNumber - 20

const convertMidiNoteNumberToNoteName = (mindiNoteNumber) =>
  convertKeyNumber88ToNoteName(convertMidiNoteNumberToKeyNumber88(midiNoteNumber))

const convertNoteNameToKeyNumber88 = (noteName) => {
  const key = noteName.substring(0, noteName.length - 1)
  const octave = noteName.substring(noteName.length - 1, noteName.length)
  const noteLookup = ['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B']
  const noteLookupIndex = noteLookup.indexOf(key) + 1
  return (octave == 0) ? noteLookupIndex - 9 : (noteLookupIndex - 9 + octave * 12)
  //console.log(`Key: ${key}, Octave: ${octave}, NoteNumber: ${noteNumber}`)
}
/*
for (let k = 1; k <= 88; k++) {
  const pianoKey = convertKeyNumber88ToNoteName(k)
  console.log(`midi number: ${convertKeyNumber88ToMidiNoteNumber(k)}, note numbeR: ${k}, piano key: ${pianoKey}`)
}
*/
