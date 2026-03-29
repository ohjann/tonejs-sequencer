import * as Tone from 'tone';
import { TrackSynthParams } from '../contexts/SynthContext';

export interface SynthBundle {
  synth: Tone.Synth;
  filter: Tone.Filter;
  panner: Tone.Panner;
  gainNode: Tone.Volume;
  dispose: () => void;
}

export function createSynthBundle(
  params: TrackSynthParams,
  output: Tone.ToneAudioNode = Tone.getDestination()
): SynthBundle {
  const gainNode = new Tone.Volume(params.volume).connect(output);
  const panner = new Tone.Panner(params.pan).connect(gainNode);
  const filter = new Tone.Filter(params.filterFrequency, params.filterType).connect(panner);
  const synth = new Tone.Synth({
    oscillator: { type: params.oscillatorType },
    envelope: {
      attack: params.attack,
      decay: params.decay,
      sustain: params.sustain,
      release: params.release,
    },
  }).connect(filter);

  return {
    synth,
    filter,
    panner,
    gainNode,
    dispose: () => {
      synth.dispose();
      filter.dispose();
      panner.dispose();
      gainNode.dispose();
    },
  };
}

export function updateSynthBundle(bundle: SynthBundle, params: TrackSynthParams): void {
  bundle.synth.set({
    oscillator: { type: params.oscillatorType },
    envelope: {
      attack: params.attack,
      decay: params.decay,
      sustain: params.sustain,
      release: params.release,
    },
  });
  bundle.filter.frequency.value = params.filterFrequency;
  bundle.filter.type = params.filterType;
  bundle.panner.pan.value = params.pan;
  bundle.gainNode.volume.value = params.mute ? -Infinity : params.volume;
}
