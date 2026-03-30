import React from 'react';
import { Undo, Redo } from 'pixelarticons/react';
import { useSequencer } from '../contexts/SequencerContext';

const UndoRedo = () => {
  const { undo, redo, canUndo, canRedo } = useSequencer();
  return (
    <div className="undo-redo">
      <button className="bit-button" onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">
        <Undo width={14} height={14} /> Undo
      </button>
      <button className="bit-button" onClick={redo} disabled={!canRedo} title="Redo (Shift+Ctrl+Z)">
        Redo <Redo width={14} height={14} />
      </button>
    </div>
  );
};

export default UndoRedo;
