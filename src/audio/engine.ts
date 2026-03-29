import * as Tone from 'tone';
import { PENTATONIC_SCALE } from './scales';

type MatrixRef = { current: number[][] | null };
type OnStepCallback = (step: number) => void;

class AudioEngine {
  private synth: Tone.PolySynth<Tone.Synth>;
  private delay: Tone.FeedbackDelay;
  private scheduleId: number | null = null;
  private currentStep = 0;
  private matrixRef: MatrixRef = { current: null };
  private onStep: OnStepCallback | null = null;

  constructor() {
    this.delay = new Tone.FeedbackDelay('4n', 0.6).toDestination();
    this.synth = new Tone.PolySynth(Tone.Synth);
    this.synth.set({
      oscillator: { type: 'triangle8' },
      envelope: { attack: 0.2, decay: 4, sustain: 1, release: 4 },
    });
    this.synth.connect(this.delay);
    this.synth.toDestination();
  }

  init(matrixRef: MatrixRef, onStep: OnStepCallback) {
    this.matrixRef = matrixRef;
    this.onStep = onStep;
  }

  start(bpm: number) {
    Tone.getTransport().bpm.value = bpm;
    this.currentStep = 0;

    this.scheduleId = Tone.getTransport().scheduleRepeat((time) => {
      const matrix = this.matrixRef.current;
      if (matrix) {
        const cols = matrix[0]?.length ?? 0;
        const step = this.currentStep % cols;
        this.onStep?.(step);

        for (let row = 0; row < matrix.length; row++) {
          if (matrix[row][step] === 1) {
            const note = PENTATONIC_SCALE[row];
            if (note) {
              this.synth.triggerAttackRelease(note, '8n', time);
            }
          }
        }

        this.currentStep = (step + 1) % cols;
      }
    }, '8n');

    Tone.getTransport().start();
  }

  stop() {
    Tone.getTransport().stop();
    if (this.scheduleId !== null) {
      Tone.getTransport().clear(this.scheduleId);
      this.scheduleId = null;
    }
    this.currentStep = 0;
    this.onStep?.(0);
  }

  setBpm(bpm: number) {
    Tone.getTransport().bpm.value = bpm;
  }

  setSwing(swing: number) {
    Tone.getTransport().swing = swing;
    Tone.getTransport().swingSubdivision = '8n';
  }
}

export const audioEngine = new AudioEngine();
