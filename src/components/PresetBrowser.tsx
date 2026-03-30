import React, { useState } from 'react';
import { useSynth, TrackSynthParams } from '../contexts/SynthContext';
import { useSequencer } from '../contexts/SequencerContext';
import { synthPresets, SynthPreset } from '../data/synthPresets';
import { patternPresets } from '../data/patternPresets';
import { randomSeed } from '../utils/gameOfLife';
import Select from './Select';

// User-created presets stored in memory (could be persisted to localStorage later)
let userPresets: SynthPreset[] = [];

export function useUserPresets() {
  const [revision, setRevision] = useState(0);

  const addPreset = (preset: SynthPreset) => {
    userPresets = [...userPresets, preset];
    setRevision((r) => r + 1);
  };

  return { userPresets, addPreset, revision };
}

interface SynthPresetSelectProps {
  trackIndex: number;
}

export const SynthPresetSelect: React.FC<SynthPresetSelectProps> = ({ trackIndex }) => {
  const { setTrackParams } = useSynth();
  const [selected, setSelected] = useState('');

  const options = [
    { value: '', label: '-- Synth Preset --' },
    ...synthPresets.map((p, i) => ({ value: String(i), label: p.name })),
  ];

  const handleChange = (value: string) => {
    setSelected(value);
    if (value === '') return;
    const preset = synthPresets[Number(value)];
    if (preset) {
      setTrackParams(trackIndex, preset.params);
    }
  };

  return <Select value={selected} onChange={handleChange} options={options} />;
};

export const GlobalSynthPresetSelect: React.FC = () => {
  const { setAllTrackParams } = useSynth();
  const { userPresets, revision } = useUserPresets();
  const [selected, setSelected] = useState('');

  const allPresets = [...synthPresets, ...userPresets];
  const options = [
    { value: '', label: '-- Synth Preset --' },
    ...allPresets.map((p, i) => ({ value: String(i), label: p.name })),
  ];

  const handleChange = (value: string) => {
    setSelected(value);
    if (value === '') return;
    const preset = allPresets[Number(value)];
    if (preset) {
      setAllTrackParams(preset.params);
    }
  };

  return <Select key={revision} value={selected} onChange={handleChange} options={options} />;
};

export const SaveSynthPreset: React.FC = () => {
  const { tracks } = useSynth();
  const { addPreset } = useUserPresets();
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    const params = tracks[0];
    addPreset({
      name: name.trim(),
      params: {
        oscillatorType: params.oscillatorType,
        attack: params.attack,
        decay: params.decay,
        sustain: params.sustain,
        release: params.release,
        filterFrequency: params.filterFrequency,
        filterType: params.filterType,
      },
    });
    setName('');
    setNaming(false);
  };

  if (!naming) {
    return (
      <button
        className="bit-button"
        onClick={() => setNaming(true)}
        style={{ fontSize: "0.8em" }}
      >
        + Save Preset
      </button>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        className="bit-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setNaming(false); }}
        placeholder="Preset name"
        autoFocus
        style={{ fontSize: "0.8em", flex: 1 }}
      />
      <button className="bit-button" onClick={handleSave} style={{ fontSize: "0.8em" }}>
        Save
      </button>
      <button className="bit-button" onClick={() => setNaming(false)} style={{ fontSize: "0.8em" }}>
        Cancel
      </button>
    </div>
  );
};

export const PatternPresetSelect: React.FC = () => {
  const { setGrid, setGameOfLifeActive, stepCount } = useSequencer();
  const [selected, setSelected] = useState('');

  const options = [
    { value: '', label: '-- Pattern Preset --' },
    ...patternPresets.map((p, i) => ({ value: String(i), label: p.name })),
  ];

  const handleChange = (value: string) => {
    setSelected(value);
    if (value === '') return;
    const preset = patternPresets[Number(value)];
    if (preset) {
      if (preset.gameOfLife) {
        const seed = randomSeed(12, stepCount);
        setGrid(seed);
        setGameOfLifeActive(true);
      } else {
        setGameOfLifeActive(false);
        setGrid(preset.grid.map(row => [...row]));
      }
    }
  };

  return <Select value={selected} onChange={handleChange} options={options} />;
};
