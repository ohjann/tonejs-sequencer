import Tone from 'tone';
import * as MidiConvert from 'midiconvert'

const MainSynth = new Tone.PolySynth(8);
const BackingSynth = new Tone.PolySynth(8);

const feedbackDelay = new Tone.FeedbackDelay("4n", 0.6).toMaster();
MainSynth.set({
  'oscillator' : {
    'type' : 'triangle8'
  },
  'envelope' : {
    'attack' : 0.2,
    'decay' : 4,
    'sustain': 1.4,
    'release': 4
  }
});

BackingSynth.set({
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

MainSynth.toMaster();
BackingSynth.connect(feedbackDelay);
BackingSynth.toMaster();

MainSynth.pentatonic = [
  'A6',
  'G6',
  'E6',
  'D6',
  'C6',
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
];

MidiConvert.load("/backing.mid", function(midi) {

  // make sure you set the tempo before you schedule the events
  Tone.Transport.bpm.value = midi.header.bpm / 2;

  // pass in the note events from one of the tracks as the second argument to Tone.Part
  var midiPart = new Tone.Part(function(time, note) {

    //use the events to play the synth
    BackingSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity / 1.2)

  }, midi.tracks[0].notes).start()

  midiPart.loopStart = 0;
  midiPart.loopEnd = 32;
  midiPart.loop = true;

  // start the transport to hear the events
  Tone.Transport.start()
})

export {
  MainSynth,
  BackingSynth,
}
