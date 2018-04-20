import Tone from 'tone'

const Synth = new Tone.PolySynth(8);

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

Synth.toMaster();

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

export default Synth;
