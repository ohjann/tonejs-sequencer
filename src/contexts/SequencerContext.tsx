import React, { createContext, useContext, useReducer } from 'react';

export interface ICoordinates {
  row: number;
  col: number;
}

interface SequencerState {
  matrix: number[][];
}

type SequencerAction =
  | { type: 'TOGGLE_CELL'; payload: ICoordinates }
  | { type: 'CLEAR_GRID' };

const ROWS = 12;
const COLS = 12;

const initialState: SequencerState = {
  matrix: Array.from(Array(ROWS), () => Array(COLS).fill(0)),
};

function sequencerReducer(state: SequencerState, action: SequencerAction): SequencerState {
  switch (action.type) {
    case 'TOGGLE_CELL': {
      const { row, col } = action.payload;
      const newMatrix = state.matrix.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? 1 - c : c)) : r
      );
      return { ...state, matrix: newMatrix };
    }
    case 'CLEAR_GRID':
      return { ...state, matrix: Array.from(Array(ROWS), () => Array(COLS).fill(0)) };
    default:
      return state;
  }
}

interface SequencerContextValue {
  matrix: number[][];
  toggleCell: (coords: ICoordinates) => void;
  clearGrid: () => void;
}

const SequencerContext = createContext<SequencerContextValue | null>(null);

export function SequencerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(sequencerReducer, initialState);

  const toggleCell = (coords: ICoordinates) => dispatch({ type: 'TOGGLE_CELL', payload: coords });
  const clearGrid = () => dispatch({ type: 'CLEAR_GRID' });

  return (
    <SequencerContext.Provider value={{ matrix: state.matrix, toggleCell, clearGrid }}>
      {children}
    </SequencerContext.Provider>
  );
}

export function useSequencer() {
  const ctx = useContext(SequencerContext);
  if (!ctx) throw new Error('useSequencer must be used within SequencerProvider');
  return ctx;
}
