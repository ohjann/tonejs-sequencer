import React, { createContext, useContext, useReducer } from 'react';

interface TransportState {
  isPlaying: boolean;
  bpm: number;
  activeStep: number;
  swing: number;
}

type TransportAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SET_BPM'; payload: number }
  | { type: 'SET_ACTIVE_STEP'; payload: number }
  | { type: 'SET_SWING'; payload: number };

const initialState: TransportState = {
  isPlaying: false,
  bpm: 120,
  activeStep: 0,
  swing: 0,
};

function transportReducer(state: TransportState, action: TransportAction): TransportState {
  switch (action.type) {
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'SET_BPM':
      return { ...state, bpm: action.payload };
    case 'SET_ACTIVE_STEP':
      return { ...state, activeStep: action.payload };
    case 'SET_SWING':
      return { ...state, swing: action.payload };
    default:
      return state;
  }
}

interface TransportContextValue {
  isPlaying: boolean;
  bpm: number;
  activeStep: number;
  swing: number;
  play: () => void;
  pause: () => void;
  setBpm: (bpm: number) => void;
  setActiveStep: (step: number) => void;
  setSwing: (swing: number) => void;
}

const TransportContext = createContext<TransportContextValue | null>(null);

export function TransportProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(transportReducer, initialState);

  const play = () => dispatch({ type: 'PLAY' });
  const pause = () => dispatch({ type: 'PAUSE' });
  const setBpm = (bpm: number) => dispatch({ type: 'SET_BPM', payload: bpm });
  const setActiveStep = (step: number) => dispatch({ type: 'SET_ACTIVE_STEP', payload: step });
  const setSwing = (swing: number) => dispatch({ type: 'SET_SWING', payload: swing });

  return (
    <TransportContext.Provider value={{ ...state, play, pause, setBpm, setActiveStep, setSwing }}>
      {children}
    </TransportContext.Provider>
  );
}

export function useTransport() {
  const ctx = useContext(TransportContext);
  if (!ctx) throw new Error('useTransport must be used within TransportProvider');
  return ctx;
}
