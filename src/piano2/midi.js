export const setupMidiAccess = (noteInOn, noteInOff) => {

  const midiOutDevices = []
  const midiInputDevices = []
  if (navigator.requestMIDIAccess) {
    console.log(`This browser supports WebMIDI`)
    navigator.requestMIDIAccess()
    .then((access) => {
      console.log(access.inputs)
      console.log(access.outputs)
      for (var input of access.inputs.values()) {
        midiInputDevices.push(input)
        input.onmidimessage = (midiMessage) => {
          if (midiMessage.data.length === 3) {
            if (midiMessage.data[2] === 0)
              noteInOff?.call(null, midiMessage.data[1])
            else
              noteInOn?.call(null, midiMessage.data[1])
          }
           
            // console.log(JSON.stringify(midiMessage.data))
        }
      }

      for (var output of access.outputs.values()) {
        midiOutDevices.push(output)
        output.onmidimessage = (midiMessage) => {
        }
        
      }
    }, 
    (err) => {
      console.log(`Could not access MIDI devices`)
    })
  } else {
    console.log(`This browser does not support Web MIDI`)
  }

  const noteOutOn = (midiNoteNumber, velocity) => {
    midiOutDevices[0].send([0x90, midiNoteNumber, velocity])
  }

  const noteOutOff = (midiNoteNumber, velocity) => {
    midiOutDevices[0].send([0x80, midiNoteNumber, velocity])
  }


  return { noteOutOn, noteOutOff }
}