import React from 'react';
import { motion } from 'framer-motion';
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

  return (
    <div className="grid-container">
      <StepCountSelector />
      <div className='grid' data-steps={stepCount}>
        {/* Step indicator that sweeps smoothly */}
        <div className='step-indicator-track'>
          <motion.div
            className='step-indicator'
            animate={{ x: activeStep * 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.5 }}
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
        {/* Active column glow overlay */}
        {activeStep >= 0 && activeStep < numCols && (
          <motion.div
            className='column-glow'
            animate={{ x: 36 + activeStep * 40, opacity: [0.25, 0.45, 0.25] }}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30, mass: 0.5 },
              opacity: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Grid;
