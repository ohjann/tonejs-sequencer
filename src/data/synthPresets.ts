import { TrackSynthParams } from '../contexts/SynthContext';

export interface SynthPreset {
  name: string;
  params: Partial<TrackSynthParams>;
}

export const synthPresets: SynthPreset[] = [
  {
    name: 'Warm Pad',
    params: {
      oscillatorType: 'sine',
      attack: 0.8,
      decay: 2.0,
      sustain: 0.7,
      release: 3.0,
      filterFrequency: 4000,
      filterType: 'lowpass',
    },
  },
  {
    name: 'Acid Bass',
    params: {
      oscillatorType: 'sawtooth',
      attack: 0.01,
      decay: 0.3,
      sustain: 0.2,
      release: 0.1,
      filterFrequency: 800,
      filterType: 'lowpass',
    },
  },
  {
    name: 'Pluck',
    params: {
      oscillatorType: 'triangle',
      attack: 0.01,
      decay: 0.4,
      sustain: 0.0,
      release: 0.3,
      filterFrequency: 6000,
      filterType: 'lowpass',
    },
  },
  {
    name: 'Bell',
    params: {
      oscillatorType: 'sine',
      attack: 0.01,
      decay: 1.5,
      sustain: 0.0,
      release: 2.0,
      filterFrequency: 12000,
      filterType: 'highpass',
    },
  },
  {
    name: 'Sub Bass',
    params: {
      oscillatorType: 'sine',
      attack: 0.05,
      decay: 0.5,
      sustain: 0.8,
      release: 0.3,
      filterFrequency: 300,
      filterType: 'lowpass',
    },
  },
  {
    name: 'Square Lead',
    params: {
      oscillatorType: 'square',
      attack: 0.05,
      decay: 0.3,
      sustain: 0.6,
      release: 0.4,
      filterFrequency: 5000,
      filterType: 'lowpass',
    },
  },
  {
    name: 'Soft Strings',
    params: {
      oscillatorType: 'sawtooth',
      attack: 1.0,
      decay: 1.5,
      sustain: 0.8,
      release: 2.5,
      filterFrequency: 3000,
      filterType: 'lowpass',
    },
  },
  {
    name: 'Bright Stab',
    params: {
      oscillatorType: 'sawtooth',
      attack: 0.01,
      decay: 0.15,
      sustain: 0.0,
      release: 0.1,
      filterFrequency: 15000,
      filterType: 'lowpass',
    },
  },
];
