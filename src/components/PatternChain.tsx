import React, { useRef } from 'react';
import { useSequencer } from '../contexts/SequencerContext';

const PatternChain: React.FC = () => {
  const { patternChain, setPatternChain, numPatterns } = useSequencer();
  const dragIndex = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragIndex.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    const from = dragIndex.current;
    if (from === null || from === dropIndex) return;
    const newChain = [...patternChain];
    const [moved] = newChain.splice(from, 1);
    newChain.splice(dropIndex, 0, moved);
    setPatternChain(newChain);
    dragIndex.current = null;
  };

  const addToChain = (patternIdx: number) => {
    setPatternChain([...patternChain, patternIdx]);
  };

  const removeFromChain = (chainIdx: number) => {
    const newChain = patternChain.filter((_, i) => i !== chainIdx);
    setPatternChain(newChain.length > 0 ? newChain : [0]);
  };

  return (
    <div className="pattern-chain">
      <span className="pattern-label">Chain:</span>
      <div className="chain-slots">
        {patternChain.map((patIdx, chainIdx) => (
          <div
            key={chainIdx}
            className="chain-slot"
            draggable
            onDragStart={(e) => handleDragStart(e, chainIdx)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, chainIdx)}
          >
            <span className="chain-slot-label">{patIdx + 1}</span>
            <button
              className="chain-remove"
              onClick={() => removeFromChain(chainIdx)}
              title="Remove from chain"
            >
              ×
            </button>
          </div>
        ))}
        <div className="chain-add-group">
          {Array.from({ length: numPatterns }, (_, i) => (
            <button
              key={i}
              className="bit-button chain-add-btn"
              onClick={() => addToChain(i)}
              title={`Add pattern ${i + 1} to chain`}
            >
              +{i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatternChain;
