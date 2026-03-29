import React, { useRef, useCallback } from 'react';
import { useTransport } from '../contexts/TransportContext';

const MIN_BPM = 60;
const MAX_BPM = 240;
const TAP_WINDOW_MS = 3000;
const MIN_TAPS = 2;

const BpmControl = () => {
  const { bpm, setBpm } = useTransport();
  const tapTimesRef = useRef<number[]>([]);

  const clamp = (v: number) => Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(v)));

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v)) setBpm(clamp(v));
  };

  const handleTap = useCallback(() => {
    const now = performance.now();
    const taps = tapTimesRef.current;

    // Drop taps older than window
    const recent = taps.filter(t => now - t < TAP_WINDOW_MS);
    recent.push(now);
    tapTimesRef.current = recent;

    if (recent.length >= MIN_TAPS) {
      const intervals: number[] = [];
      for (let i = 1; i < recent.length; i++) {
        intervals.push(recent[i] - recent[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const tappedBpm = clamp(60000 / avgInterval);
      setBpm(tappedBpm);
    }
  }, [setBpm]);

  return (
    <div className="bpm-control">
      <label className="bpm-label">BPM</label>
      <input
        type="range"
        className="bpm-slider"
        min={MIN_BPM}
        max={MAX_BPM}
        value={bpm}
        onChange={handleSlider}
      />
      <input
        type="number"
        className="bpm-input bit-input"
        min={MIN_BPM}
        max={MAX_BPM}
        value={bpm}
        onChange={handleInput}
      />
      <button className="bit-button bpm-tap" onClick={handleTap} title="Tap Tempo">
        Tap
      </button>
    </div>
  );
};

export default BpmControl;
