import Tone from 'tone'

const Synth = new Tone.PolySynth(16, Tone.Synth).toMaster();

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
