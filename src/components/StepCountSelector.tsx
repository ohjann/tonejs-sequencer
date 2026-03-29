import React from 'react';
import { useSequencer, STEP_COUNT_OPTIONS, StepCount } from '../contexts/SequencerContext';

const StepCountSelector = () => {
  const { stepCount, setStepCount } = useSequencer();

  return (
    <div className="step-count-selector">
      <span className="step-count-label">Steps</span>
      <div className="step-count-buttons">
        {STEP_COUNT_OPTIONS.map((count) => (
          <button
            key={count}
            className={`bit-button step-count-btn${count === stepCount ? ' active' : ''}`}
            onClick={() => setStepCount(count as StepCount)}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepCountSelector;
