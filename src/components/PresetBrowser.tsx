import React from 'react';
import { useSynth } from '../contexts/SynthContext';
import { useSequencer } from '../contexts/SequencerContext';
import { synthPresets } from '../data/synthPresets';
import { patternPresets } from '../data/patternPresets';
import Select from './Select';

interface SynthPresetSelectProps {
  trackIndex: number;
}

export const SynthPresetSelect: React.FC<SynthPresetSelectProps> = ({ trackIndex }) => {
  const { setTrackParams } = useSynth();

  const options = [
    { value: '', label: '-- Synth Preset --' },
    ...synthPresets.map((p, i) => ({ value: String(i), label: p.name })),
  ];

  const handleChange = (value: string) => {
    if (value === '') return;
    const preset = synthPresets[Number(value)];
    if (preset) {
      setTrackParams(trackIndex, preset.params);
    }
  };

  return <Select value="" onChange={handleChange} options={options} label="Synth Preset" />;
};

export const PatternPresetSelect: React.FC = () => {
  const { setGrid } = useSequencer();

  const options = [
    { value: '', label: '-- Pattern Preset --' },
    ...patternPresets.map((p, i) => ({ value: String(i), label: p.name })),
  ];

  const handleChange = (value: string) => {
    if (value === '') return;
    const preset = patternPresets[Number(value)];
    if (preset) {
      setGrid(preset.grid.map(row => [...row]));
    }
  };

  return <Select value="" onChange={handleChange} options={options} label="Pattern Preset" />;
};
