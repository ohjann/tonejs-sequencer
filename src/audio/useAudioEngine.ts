import { useEffect, useRef, useCallback } from 'react';
import { useSequencer } from '../contexts/SequencerContext';
import { useTransport } from '../contexts/TransportContext';
import { useSynth } from '../contexts/SynthContext';
import { audioEngine } from './engine';

export function useAudioEngine() {
  const { patterns, patternChain, scaleNotes, switchPattern } = useSequencer();
  const { isPlaying, bpm, swing, setActiveStep } = useTransport();
  const { tracks, masterVolume } = useSynth();

  const patternsRef = useRef(patterns);
  useEffect(() => {
    patternsRef.current = patterns;
  }, [patterns]);

  const patternChainRef = useRef(patternChain);
  useEffect(() => {
    patternChainRef.current = patternChain;
  }, [patternChain]);

  const scaleNotesRef = useRef(scaleNotes);
  useEffect(() => {
    scaleNotesRef.current = scaleNotes;
  }, [scaleNotes]);

  const onPatternChange = useCallback((patternIdx: number) => {
    switchPattern(patternIdx);
  }, [switchPattern]);

  useEffect(() => {
    audioEngine.init(patternsRef, patternChainRef, scaleNotesRef, setActiveStep, onPatternChange);
  }, [setActiveStep, onPatternChange]);

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

  useEffect(() => {
    audioEngine.setMasterVolume(masterVolume);
  }, [masterVolume]);
}
