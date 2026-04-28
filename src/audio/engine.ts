import * as Tone from 'tone';
import { TrackSynthParams, DEFAULT_TRACK_PARAMS } from '../contexts/SynthContext';
import { SynthBundle, createSynthBundle, updateSynthBundle } from './synth-factory';

type PatternsRef = { current: number[][][] };
type PatternChainRef = { current: number[] };
type ScaleNotesRef = { current: string[] };
type OnStepCallback = (step: number) => void;
type OnPatternChange = (patternIdx: number) => void;
type OnLoopRestart = () => void;

const ROW_COUNT = 12;

class AudioEngine {
  private bundles: SynthBundle[];
  private trackParams: TrackSynthParams[];
  private delay: Tone.FeedbackDelay;
  private scheduleId: number | null = null;
  private currentStep = 0;
  private chainIndex = 0;
  private patternsRef: PatternsRef = { current: [] };
  private patternChainRef: PatternChainRef = { current: [0] };
  private scaleNotesRef: ScaleNotesRef = { current: [] };
  private onStep: OnStepCallback | null = null;
  private onPatternChange: OnPatternChange | null = null;
  private onLoopRestart: OnLoopRestart | null = null;

  constructor() {
    this.delay = new Tone.FeedbackDelay('4n', 0.6).toDestination();
    this.trackParams = Array.from({ length: ROW_COUNT }, () => ({ ...DEFAULT_TRACK_PARAMS }));
    this.bundles = this.trackParams.map((p) => createSynthBundle(p, this.delay));
  }

  init(
    patternsRef: PatternsRef,
    patternChainRef: PatternChainRef,
    scaleNotesRef: ScaleNotesRef,
    onStep: OnStepCallback,
    onPatternChange: OnPatternChange,
    onLoopRestart?: OnLoopRestart,
  ) {
    this.patternsRef = patternsRef;
    this.patternChainRef = patternChainRef;
    this.scaleNotesRef = scaleNotesRef;
    this.onStep = onStep;
    this.onPatternChange = onPatternChange;
    this.onLoopRestart = onLoopRestart ?? null;
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

  async start(bpm: number) {
    await Tone.start();
    Tone.getTransport().bpm.value = bpm;
    this.currentStep = 0;
    this.chainIndex = 0;

    this.scheduleId = Tone.getTransport().scheduleRepeat((time) => {
      const chain = this.patternChainRef.current;
      const patterns = this.patternsRef.current;
      if (chain.length === 0 || patterns.length === 0) return;

      const patternIdx = chain[this.chainIndex % chain.length];
      const matrix = patterns[patternIdx];
      if (!matrix) return;

      const cols = matrix[0]?.length ?? 0;
      const step = this.currentStep % cols;
      Tone.getDraw().schedule(() => this.onStep?.(step), time);

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

      const nextStep = step + 1;
      if (nextStep >= cols) {
        this.currentStep = 0;
        const nextChainIndex = (this.chainIndex + 1) % chain.length;
        this.chainIndex = nextChainIndex;
        Tone.getDraw().schedule(() => {
          this.onPatternChange?.(chain[nextChainIndex]);
          this.onLoopRestart?.();
        }, time);
      } else {
        this.currentStep = nextStep;
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

  setMasterVolume(volume: number) {
    Tone.getDestination().volume.value = volume;
  }
}

export const audioEngine = new AudioEngine();
