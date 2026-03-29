import React from 'react';
import { useSynth } from '../contexts/SynthContext';
import Slider from './Slider';

const MasterVolume: React.FC = () => {
  const { masterVolume, setMasterVolume } = useSynth();

  return (
    <Slider
      value={masterVolume}
      onChange={setMasterVolume}
      min={-60}
      max={0}
      step={1}
      label="Master Vol"
    />
  );
};

export default MasterVolume;
