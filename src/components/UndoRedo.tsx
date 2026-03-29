import React from 'react';
import { useSequencer } from '../contexts/SequencerContext';

const UndoRedo = () => {
  const { undo, redo, canUndo, canRedo } = useSequencer();
  return (
    <div className="undo-redo">
      <button className="bit-button" onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">
        ↩ Undo
      </button>
      <button className="bit-button" onClick={redo} disabled={!canRedo} title="Redo (Shift+Ctrl+Z)">
        Redo ↪
      </button>
    </div>
  );
};

export default UndoRedo;
