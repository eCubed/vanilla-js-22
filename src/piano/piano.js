const calculateFrequency = (pianoKeyNumber) => Math.pow(2, (pianoKeyNumber - 49)/12) * 440

const audioContext = new AudioContext();
const o = audioContext.createOscillator();
o.start()


const isBlackKey = (keyNumber) =>
  keyNumber % 12 === 2 ||
  keyNumber % 12 === 5 ||
  keyNumber % 12 === 7 ||
  keyNumber % 12 === 10 ||
  keyNumber % 12 === 0

const calculateX = (keyNumber, whiteKeyWidth) => {
  const k = Math.floor(keyNumber / 12) * whiteKeyWidth * 7
  // console.log(`Key: ${keyNumber}, K: ${k}`)
  switch (keyNumber % 12) {
    case 1: return k
    case 2: return k + 3/4 * whiteKeyWidth
    case 3: return k + whiteKeyWidth
    case 4: return k + 2 * whiteKeyWidth
    case 5: return k + 11/4 * whiteKeyWidth
    case 6: return k + 3 * whiteKeyWidth
    case 7: return k + 15/4 * whiteKeyWidth
    case 8: return k + 4 * whiteKeyWidth
    case 9: return k + 5 * whiteKeyWidth
    case 10: return k + 23/4 * whiteKeyWidth
    case 11: return k + 6 * whiteKeyWidth
    case 0: return k - 1/4 * whiteKeyWidth
  }
}

const createKey = (keyNumber, whiteKeyWidth, pianoKeyDown, pianoKeyUp) => {
  const key = document.createElement('div')
  
  const isBlack = isBlackKey(keyNumber)
  const x = calculateX(keyNumber, whiteKeyWidth)
  
  key.classList.add('key')
  isBlack && key.classList.add('black')
  key.style.left = `${x}px`
  
  key.addEventListener('mousedown', () => { pianoKeyDown(keyNumber) })
  key.addEventListener('mouseup', () => { pianoKeyUp(keyNumber)})

  return key;
}

const onPianoKeyDown = (keyNumber) => {
  console.log(`key down: ${keyNumber}`)
  o.frequency.setTargetAtTime( calculateFrequency(keyNumber), audioContext.currentTime, 0)
  o.connect(audioContext.destination)
  audioContext.resume()
}

const onPianoKeyUp = (keyNumber) => {
  audioContext.suspend()
}

const drawKeyboard = () => {
  const keyboard = document.getElementById('keyboard')

  for(let key = 1; key <= 88; key++) {
    const newKey = createKey(key, 40, onPianoKeyDown, onPianoKeyUp)
    console.log(`key: ${key}, x: ${newKey.style.left}`)
    keyboard.appendChild(newKey)
  }
}

drawKeyboard()