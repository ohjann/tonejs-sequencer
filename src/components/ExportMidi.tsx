import React from 'react';
import { useSequencer } from '../contexts/SequencerContext';
import { useTransport } from '../contexts/TransportContext';
import { exportPatternAsMidi } from '../audio/exportMidi';

const ExportMidi = () => {
  const { matrix } = useSequencer();
  const { bpm } = useTransport();

  const handleExport = () => {
    exportPatternAsMidi(matrix, bpm);
  };

  return (
    <button className="bit-button" onClick={handleExport}>
      Export MIDI
    </button>
  );
};

export default ExportMidi;
