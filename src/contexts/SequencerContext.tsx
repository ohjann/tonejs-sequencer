import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { ScaleName, RootNote, generateScaleNotes } from '../audio/scales';

export interface ICoordinates {
  row: number;
  col: number;
}

export type StepCount = 8 | 12 | 16 | 32;
export const STEP_COUNT_OPTIONS: StepCount[] = [8, 12, 16, 32];
export const MAX_VELOCITY = 3;

const ROWS = 12;
const DEFAULT_COLS = 12;
const NUM_PATTERNS = 8;
const MAX_HISTORY = 50;

function emptyGrid(cols: number = DEFAULT_COLS): number[][] {
  return Array.from(Array(ROWS), () => Array(cols).fill(0));
}

interface SequencerState {
  patterns: number[][][];
  activePattern: number;
  patternChain: number[];
  clipboard: number[][] | null;
  past: number[][][];
  future: number[][][];
  scaleName: ScaleName;
  rootNote: RootNote;
  stepCount: StepCount;
}

type SequencerAction =
  | { type: 'TOGGLE_CELL'; payload: ICoordinates }
  | { type: 'CYCLE_VELOCITY'; payload: ICoordinates }
  | { type: 'CLEAR_GRID' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET_SCALE'; payload: ScaleName }
  | { type: 'SET_ROOT_NOTE'; payload: RootNote }
  | { type: 'SWITCH_PATTERN'; payload: number }
  | { type: 'COPY_PATTERN' }
  | { type: 'PASTE_PATTERN' }
  | { type: 'SET_PATTERN_CHAIN'; payload: number[] }
  | { type: 'SET_STEP_COUNT'; payload: StepCount }
  | { type: 'SET_GRID'; payload: number[][] };

const initialState: SequencerState = {
  patterns: Array.from({ length: NUM_PATTERNS }, () => emptyGrid(DEFAULT_COLS)),
  activePattern: 0,
  patternChain: [0],
  clipboard: null,
  past: [],
  future: [],
  scaleName: 'pentatonic',
  rootNote: 'A',
  stepCount: DEFAULT_COLS as StepCount,
};

function sequencerReducer(state: SequencerState, action: SequencerAction): SequencerState {
  const currentMatrix = state.patterns[state.activePattern];

  switch (action.type) {
    case 'TOGGLE_CELL': {
      const { row, col } = action.payload;
      const newMatrix = currentMatrix.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? (c > 0 ? 0 : 1) : c)) : r
      );
      const newPatterns = state.patterns.map((p, i) =>
        i === state.activePattern ? newMatrix : p
      );
      const newPast = [...state.past, currentMatrix].slice(-MAX_HISTORY);
      return { ...state, patterns: newPatterns, past: newPast, future: [] };
    }
    case 'CYCLE_VELOCITY': {
      const { row, col } = action.payload;
      const current = currentMatrix[row]?.[col] ?? 0;
      if (current === 0) return state;
      const next = (current % MAX_VELOCITY) + 1;
      const newMatrix = currentMatrix.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? next : c)) : r
      );
      const newPatterns = state.patterns.map((p, i) =>
        i === state.activePattern ? newMatrix : p
      );
      const newPast = [...state.past, currentMatrix].slice(-MAX_HISTORY);
      return { ...state, patterns: newPatterns, past: newPast, future: [] };
    }
    case 'CLEAR_GRID': {
      const newMatrix = emptyGrid();
      const newPatterns = state.patterns.map((p, i) =>
        i === state.activePattern ? newMatrix : p
      );
      const newPast = [...state.past, currentMatrix].slice(-MAX_HISTORY);
      return { ...state, patterns: newPatterns, past: newPast, future: [] };
    }
    case 'UNDO': {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      const newFuture = [currentMatrix, ...state.future];
      const newPatterns = state.patterns.map((p, i) =>
        i === state.activePattern ? previous : p
      );
      return { ...state, patterns: newPatterns, past: newPast, future: newFuture };
    }
    case 'REDO': {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      const newPast = [...state.past, currentMatrix].slice(-MAX_HISTORY);
      const newPatterns = state.patterns.map((p, i) =>
        i === state.activePattern ? next : p
      );
      return { ...state, patterns: newPatterns, past: newPast, future: newFuture };
    }
    case 'SWITCH_PATTERN': {
      const idx = action.payload;
      if (idx < 0 || idx >= NUM_PATTERNS || idx === state.activePattern) return state;
      return { ...state, activePattern: idx, past: [], future: [] };
    }
    case 'COPY_PATTERN': {
      return { ...state, clipboard: currentMatrix.map(row => [...row]) };
    }
    case 'PASTE_PATTERN': {
      if (!state.clipboard) return state;
      const newPast = [...state.past, currentMatrix].slice(-MAX_HISTORY);
      const newPatterns = state.patterns.map((p, i) =>
        i === state.activePattern ? state.clipboard!.map(row => [...row]) : p
      );
      return { ...state, patterns: newPatterns, past: newPast, future: [] };
    }
    case 'SET_PATTERN_CHAIN': {
      return { ...state, patternChain: action.payload };
    }
    case 'SET_STEP_COUNT': {
      const newStepCount = action.payload;
      const newPatterns = state.patterns.map(pattern =>
        pattern.map(row => {
          if (row.length === newStepCount) return row;
          if (row.length < newStepCount) {
            return [...row, ...Array(newStepCount - row.length).fill(0)];
          }
          return row.slice(0, newStepCount);
        })
      );
      return { ...state, patterns: newPatterns, stepCount: newStepCount, past: [], future: [] };
    }
    case 'SET_GRID': {
      const newPast = [...state.past, currentMatrix].slice(-MAX_HISTORY);
      const newPatterns = state.patterns.map((p, i) =>
        i === state.activePattern ? action.payload : p
      );
      return { ...state, patterns: newPatterns, past: newPast, future: [] };
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
  cycleVelocity: (coords: ICoordinates) => void;
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
  patterns: number[][][];
  activePattern: number;
  patternChain: number[];
  clipboard: number[][] | null;
  switchPattern: (idx: number) => void;
  copyPattern: () => void;
  pastePattern: () => void;
  setPatternChain: (chain: number[]) => void;
  setGrid: (grid: number[][]) => void;
  numPatterns: number;
  stepCount: StepCount;
  setStepCount: (count: StepCount) => void;
}

const SequencerContext = createContext<SequencerContextValue | null>(null);

export function SequencerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(sequencerReducer, initialState);

  const toggleCell = useCallback((coords: ICoordinates) => dispatch({ type: 'TOGGLE_CELL', payload: coords }), []);
  const cycleVelocity = useCallback((coords: ICoordinates) => dispatch({ type: 'CYCLE_VELOCITY', payload: coords }), []);
  const clearGrid = useCallback(() => dispatch({ type: 'CLEAR_GRID' }), []);
  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);
  const setScale = useCallback((scale: ScaleName) => dispatch({ type: 'SET_SCALE', payload: scale }), []);
  const setRootNote = useCallback((root: RootNote) => dispatch({ type: 'SET_ROOT_NOTE', payload: root }), []);
  const switchPattern = useCallback((idx: number) => dispatch({ type: 'SWITCH_PATTERN', payload: idx }), []);
  const copyPattern = useCallback(() => dispatch({ type: 'COPY_PATTERN' }), []);
  const pastePattern = useCallback(() => dispatch({ type: 'PASTE_PATTERN' }), []);
  const setPatternChain = useCallback((chain: number[]) => dispatch({ type: 'SET_PATTERN_CHAIN', payload: chain }), []);
  const setStepCount = useCallback((count: StepCount) => dispatch({ type: 'SET_STEP_COUNT', payload: count }), []);
  const setGrid = useCallback((grid: number[][]) => dispatch({ type: 'SET_GRID', payload: grid }), []);

  const scaleNotes = useMemo(
    () => generateScaleNotes(state.scaleName, state.rootNote, state.patterns[state.activePattern].length),
    [state.scaleName, state.rootNote, state.patterns, state.activePattern]
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
      matrix: state.patterns[state.activePattern],
      toggleCell,
      cycleVelocity,
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
      patterns: state.patterns,
      activePattern: state.activePattern,
      patternChain: state.patternChain,
      clipboard: state.clipboard,
      switchPattern,
      copyPattern,
      pastePattern,
      setPatternChain,
      setGrid,
      numPatterns: NUM_PATTERNS,
      stepCount: state.stepCount,
      setStepCount,
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
