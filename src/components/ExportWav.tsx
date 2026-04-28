import React, { useState } from 'react';
import { Download } from 'pixelarticons/react';
import { useSequencer } from '../contexts/SequencerContext';
import { useTransport } from '../contexts/TransportContext';
import { exportPatternAsWav } from '../audio/exportWav';

const ExportWav = () => {
  const { matrix, scaleNotes } = useSequencer();
  const { bpm } = useTransport();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportPatternAsWav(matrix, bpm, scaleNotes);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button className="bit-button" onClick={handleExport} disabled={exporting}>
      <Download width={14} height={14} /> {exporting ? 'Exporting...' : 'WAV'}
    </button>
  );
};

export default ExportWav;
