import Tone from 'tone';
import * as MidiConvert from 'midiconvert'

const Synth = new Tone.PolySynth(8);
const Synth2 = new Tone.PolySynth(8);

const feedbackDelay = new Tone.FeedbackDelay("4n", 0.6).toMaster();
Synth.set({
  'oscillator' : {
    'type' : 'triangle8'
  },
  'envelope' : {
    'attack' : 2,
    'decay' : 4,
    'sustain': 1.4,
    'release': 4
  }
});

Synth2.set({
  'oscillator' : {
    'type' : 'sine'
  },
  'envelope' : {
    'attack' : 0,
    'decay' : 3,
    'sustain': 0.2,
    'release': 2
  }
});

Synth.toMaster();
Synth2.connect(feedbackDelay);
Synth2.toMaster();

Synth.pentatonic = [
  'A5',
  'G5',
  'E5',
  'D5',
  'C5',
  'A4',
  'G4',
  'E4',
  'D4',
  'C4',
  'A3',
  'G3',
  'E3',
  'D3',
  'C3',
  'A2',
];

MidiConvert.load("/backing.mid", function(midi) {

  // make sure you set the tempo before you schedule the events
  Tone.Transport.bpm.value = midi.header.bpm / 2;

  // pass in the note events from one of the tracks as the second argument to Tone.Part
  var midiPart = new Tone.Part(function(time, note) {

    //use the events to play the synth
    Synth2.triggerAttackRelease(note.name, note.duration, time, note.velocity / 1.2)

  }, midi.tracks[0].notes).start()

  midiPart.loopStart = 0;
  midiPart.loopEnd = 32;
  midiPart.loop = true;

  // start the transport to hear the events
  Tone.Transport.start()
})

export default Synth;
