import React from 'react';
import { Note } from 'pixelarticons/react';
import { useSequencer } from '../contexts/SequencerContext';
import { useTransport } from '../contexts/TransportContext';
import { exportPatternAsMidi } from '../audio/exportMidi';

const ExportMidi = () => {
  const { matrix, scaleNotes } = useSequencer();
  const { bpm } = useTransport();

  const handleExport = () => {
    exportPatternAsMidi(matrix, bpm, scaleNotes);
  };

  return (
    <button className="bit-button" onClick={handleExport}>
      <Note width={14} height={14} /> MIDI
    </button>
  );
};

export default ExportMidi;
