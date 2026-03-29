import React from 'react';
import { useSequencer } from '../contexts/SequencerContext';
import { SCALE_NAMES, SCALE_DISPLAY_NAMES, ROOT_NOTES, ScaleName, RootNote } from '../audio/scales';

const ScaleSelector = () => {
  const { scaleName, rootNote, setScale, setRootNote } = useSequencer();

  return (
    <div className="scale-selector">
      <select
        className="bit-select"
        value={rootNote}
        onChange={(e) => setRootNote(e.target.value as RootNote)}
        aria-label="Root note"
      >
        {ROOT_NOTES.map((note) => (
          <option key={note} value={note}>{note}</option>
        ))}
      </select>
      <select
        className="bit-select"
        value={scaleName}
        onChange={(e) => setScale(e.target.value as ScaleName)}
        aria-label="Scale"
      >
        {SCALE_NAMES.map((name) => (
          <option key={name} value={name}>{SCALE_DISPLAY_NAMES[name]}</option>
        ))}
      </select>
    </div>
  );
};

export default ScaleSelector;
