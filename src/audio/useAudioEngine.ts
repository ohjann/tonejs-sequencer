import { useEffect, useRef } from 'react';
import { useSequencer } from '../contexts/SequencerContext';
import { useTransport } from '../contexts/TransportContext';
import { useSynth } from '../contexts/SynthContext';
import { audioEngine } from './engine';

export function useAudioEngine() {
  const { matrix } = useSequencer();
  const { isPlaying, bpm, swing, setActiveStep } = useTransport();
  const { tracks } = useSynth();

  const matrixRef = useRef(matrix);
  useEffect(() => {
    matrixRef.current = matrix;
  }, [matrix]);

  useEffect(() => {
    audioEngine.init(matrixRef, setActiveStep);
  }, [setActiveStep]);

  useEffect(() => {
    if (isPlaying) {
      audioEngine.start(bpm);
    } else {
      audioEngine.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    audioEngine.setBpm(bpm);
  }, [bpm]);

  useEffect(() => {
    audioEngine.setSwing(swing);
  }, [swing]);

  useEffect(() => {
    tracks.forEach((params, row) => {
      audioEngine.updateTrackSynth(row, params);
    });
  }, [tracks]);
}
