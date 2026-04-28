import React from 'react';
import Cell from './Cell';
import { useSequencer } from '../contexts/SequencerContext';
import { useTransport } from '../contexts/TransportContext';
import StepCountSelector from './StepCountSelector';
import { SynthPresetSelect } from './PresetBrowser';
import '../styles/App.css';

const Grid = () => {
  const { matrix, toggleCell, cycleVelocity, scaleNotes, stepCount } = useSequencer();
  const { activeStep } = useTransport();
  const numCols = matrix[0]?.length ?? 16;
  const stepPct = 100 / numCols;

  return (
    <div className="grid-container">
      <StepCountSelector />
      <div className='grid' data-steps={stepCount}>
        {/* Step indicator that follows active step */}
        <div className='step-indicator-track'>
          <div
            className='step-indicator'
            style={{ left: `${activeStep * stepPct}%`, width: `${stepPct}%` }}
          />
        </div>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            <span className='row-label'>{scaleNotes[rowIndex] ?? ''}</span>
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                active={colIndex === activeStep}
                velocity={cell}
                onToggle={toggleCell}
                onCycleVelocity={cycleVelocity}
              />
            ))}
            <SynthPresetSelect trackIndex={rowIndex} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
