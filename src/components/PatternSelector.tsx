import React from 'react';
import { useSequencer } from '../contexts/SequencerContext';

const PatternSelector: React.FC = () => {
  const { activePattern, switchPattern, copyPattern, pastePattern, clipboard, numPatterns } = useSequencer();

  return (
    <div className="pattern-selector">
      <span className="pattern-label">Patterns:</span>
      <div className="pattern-buttons">
        {Array.from({ length: numPatterns }, (_, i) => (
          <button
            key={i}
            className={`bit-button pattern-btn${activePattern === i ? ' active' : ''}`}
            onClick={() => switchPattern(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="pattern-actions">
        <button className="bit-button" onClick={copyPattern} title="Copy pattern">
          Copy
        </button>
        <button
          className="bit-button"
          onClick={pastePattern}
          disabled={clipboard === null}
          title="Paste pattern"
        >
          Paste
        </button>
      </div>
    </div>
  );
};

export default PatternSelector;
