import React, { useCallback } from 'react';
import { ICoordinates } from '../contexts/SequencerContext';
import '../styles/App.css';

interface CellProps {
  row: number;
  col: number;
  active: boolean;
  velocity: number;
  onToggle: (coords: ICoordinates) => void;
  onCycleVelocity: (coords: ICoordinates) => void;
}

const Cell = React.memo(({ row, col, active, velocity, onToggle, onCycleVelocity }: CellProps) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (e.shiftKey && velocity > 0) {
      onCycleVelocity({ row, col });
    } else {
      onToggle({ row, col });
    }
  }, [onToggle, onCycleVelocity, row, col, velocity]);

  let className = 'square';
  if (active) className += ' active';
  if (velocity > 0) className += ` toggled vel-${velocity}`;

  return (
    <div
      className={className}
      onClick={handleClick}
    />
  );
});

Cell.displayName = 'Cell';
export default Cell;
