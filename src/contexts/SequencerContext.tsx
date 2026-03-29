import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { ScaleName, RootNote, generateScaleNotes } from '../audio/scales';

export interface ICoordinates {
  row: number;
  col: number;
}

interface SequencerState {
  matrix: number[][];
  past: number[][][];
  future: number[][][];
  scaleName: ScaleName;
  rootNote: RootNote;
}

type SequencerAction =
  | { type: 'TOGGLE_CELL'; payload: ICoordinates }
  | { type: 'CLEAR_GRID' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET_SCALE'; payload: ScaleName }
  | { type: 'SET_ROOT_NOTE'; payload: RootNote };

const ROWS = 12;
const COLS = 12;
const MAX_HISTORY = 50;

const initialState: SequencerState = {
  matrix: Array.from(Array(ROWS), () => Array(COLS).fill(0)),
  past: [],
  future: [],
  scaleName: 'pentatonic',
  rootNote: 'A',
};

function sequencerReducer(state: SequencerState, action: SequencerAction): SequencerState {
  switch (action.type) {
    case 'TOGGLE_CELL': {
      const { row, col } = action.payload;
      const newMatrix = state.matrix.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? 1 - c : c)) : r
      );
      const newPast = [...state.past, state.matrix].slice(-MAX_HISTORY);
      return { ...state, matrix: newMatrix, past: newPast, future: [] };
    }
    case 'CLEAR_GRID': {
      const newMatrix = Array.from(Array(ROWS), () => Array(COLS).fill(0));
      const newPast = [...state.past, state.matrix].slice(-MAX_HISTORY);
      return { ...state, matrix: newMatrix, past: newPast, future: [] };
    }
    case 'UNDO': {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      const newFuture = [state.matrix, ...state.future];
      return { ...state, matrix: previous, past: newPast, future: newFuture };
    }
    case 'REDO': {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      const newPast = [...state.past, state.matrix].slice(-MAX_HISTORY);
      return { ...state, matrix: next, past: newPast, future: newFuture };
    }
    case 'SET_SCALE':
      return { ...state, scaleName: action.payload };
    case 'SET_ROOT_NOTE':
      return { ...state, rootNote: action.payload };
    default:
      return state;
  }
}

interface SequencerContextValue {
  matrix: number[][];
  toggleCell: (coords: ICoordinates) => void;
  clearGrid: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  scaleName: ScaleName;
  rootNote: RootNote;
  scaleNotes: string[];
  setScale: (scale: ScaleName) => void;
  setRootNote: (root: RootNote) => void;
}

const SequencerContext = createContext<SequencerContextValue | null>(null);

export function SequencerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(sequencerReducer, initialState);

  const toggleCell = useCallback((coords: ICoordinates) => dispatch({ type: 'TOGGLE_CELL', payload: coords }), []);
  const clearGrid = useCallback(() => dispatch({ type: 'CLEAR_GRID' }), []);
  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);
  const setScale = useCallback((scale: ScaleName) => dispatch({ type: 'SET_SCALE', payload: scale }), []);
  const setRootNote = useCallback((root: RootNote) => dispatch({ type: 'SET_ROOT_NOTE', payload: root }), []);

  const scaleNotes = useMemo(
    () => generateScaleNotes(state.scaleName, state.rootNote, state.matrix.length),
    [state.scaleName, state.rootNote, state.matrix.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        dispatch({ type: 'UNDO' });
      } else if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
        e.preventDefault();
        dispatch({ type: 'REDO' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SequencerContext.Provider value={{
      matrix: state.matrix,
      toggleCell,
      clearGrid,
      undo,
      redo,
      canUndo: state.past.length > 0,
      canRedo: state.future.length > 0,
      scaleName: state.scaleName,
      rootNote: state.rootNote,
      scaleNotes,
      setScale,
      setRootNote,
    }}>
      {children}
    </SequencerContext.Provider>
  );
}

export function useSequencer() {
  const ctx = useContext(SequencerContext);
  if (!ctx) throw new Error('useSequencer must be used within SequencerProvider');
  return ctx;
}
