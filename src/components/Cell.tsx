import React, { useCallback } from 'react';
import { ICoordinates } from '../contexts/SequencerContext';
import '../styles/App.css';

interface CellProps {
  row: number;
  col: number;
  active: boolean;
  toggled: boolean;
  onToggle: (coords: ICoordinates) => void;
}

const Cell = React.memo(({ row, col, active, toggled, onToggle }: CellProps) => {
  const handleClick = useCallback(() => onToggle({ row, col }), [onToggle, row, col]);
  return (
    <div
      className={`square${active ? ' active' : ''}${toggled ? ' toggled' : ''}`}
      onClick={handleClick}
    />
  );
});

Cell.displayName = 'Cell';
export default Cell;
