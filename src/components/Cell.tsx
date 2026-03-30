import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      className={className}
      onClick={handleClick}
      animate={{
        scale: velocity > 0 ? [1, 1.15, 1] : 1,
        backgroundColor: velocity > 0
          ? 'var(--1bit-bg)'
          : 'var(--1bit-fg)',
      }}
      transition={{
        scale: { duration: 0.15, ease: 'easeOut' },
        backgroundColor: { duration: 0.12, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.9 }}
    />
  );
});

Cell.displayName = 'Cell';
export default Cell;
