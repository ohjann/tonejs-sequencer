import * as Tone from 'tone';
import { TrackSynthParams, DEFAULT_TRACK_PARAMS } from '../contexts/SynthContext';
import { SynthBundle, createSynthBundle, updateSynthBundle } from './synth-factory';

type MatrixRef = { current: number[][] | null };
type ScaleNotesRef = { current: string[] };
type OnStepCallback = (step: number) => void;

const ROW_COUNT = 12;

class AudioEngine {
  private bundles: SynthBundle[];
  private trackParams: TrackSynthParams[];
  private delay: Tone.FeedbackDelay;
  private scheduleId: number | null = null;
  private currentStep = 0;
  private matrixRef: MatrixRef = { current: null };
  private scaleNotesRef: ScaleNotesRef = { current: [] };
  private onStep: OnStepCallback | null = null;

  constructor() {
    this.delay = new Tone.FeedbackDelay('4n', 0.6).toDestination();
    this.trackParams = Array.from({ length: ROW_COUNT }, () => ({ ...DEFAULT_TRACK_PARAMS }));
    this.bundles = this.trackParams.map((p) => createSynthBundle(p, this.delay));
  }

  init(matrixRef: MatrixRef, scaleNotesRef: ScaleNotesRef, onStep: OnStepCallback) {
    this.matrixRef = matrixRef;
    this.scaleNotesRef = scaleNotesRef;
    this.onStep = onStep;
  }

  updateTrackSynth(row: number, params: TrackSynthParams) {
    if (row < 0 || row >= ROW_COUNT) return;
    this.trackParams[row] = params;
    updateSynthBundle(this.bundles[row], params);
  }

  private isTrackAudible(row: number): boolean {
    const params = this.trackParams[row];
    if (params.mute) return false;
    const anySolo = this.trackParams.some((p) => p.solo);
    if (anySolo && !params.solo) return false;
    return true;
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
          const velocity = matrix[row][step];
          if (velocity > 0 && this.isTrackAudible(row)) {
            const note = this.scaleNotesRef.current[row];
            if (note) {
              const vel = velocity / 3;
              this.bundles[row].synth.triggerAttackRelease(note, '8n', time, vel);
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
