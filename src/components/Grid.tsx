import React from 'react';
import Cell from './Cell';
import { useSequencer } from '../contexts/SequencerContext';
import { useTransport } from '../contexts/TransportContext';
import '../styles/App.css';

const Grid = () => {
  const { matrix, toggleCell, scaleNotes } = useSequencer();
  const { activeStep } = useTransport();

  return (
    <div className='grid'>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          <span className='row-label'>{scaleNotes[rowIndex] ?? ''}</span>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              active={colIndex === activeStep}
              toggled={Boolean(cell)}
              onToggle={toggleCell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
