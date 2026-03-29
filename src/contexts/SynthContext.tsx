import React, { createContext, useContext, useReducer } from 'react';

export type OscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle' | 'triangle8';

export interface TrackSynthParams {
  oscillatorType: OscillatorType;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  filterFrequency: number;
  filterType: BiquadFilterType;
  volume: number;
  pan: number;
  mute: boolean;
  solo: boolean;
}

export const DEFAULT_TRACK_PARAMS: TrackSynthParams = {
  oscillatorType: 'triangle8',
  attack: 0.2,
  decay: 4,
  sustain: 1,
  release: 4,
  filterFrequency: 20000,
  filterType: 'lowpass',
  volume: 0,
  pan: 0,
  mute: false,
  solo: false,
};

const ROWS = 12;

interface SynthState {
  tracks: TrackSynthParams[];
}

type SynthAction =
  | { type: 'SET_TRACK_PARAMS'; payload: { row: number; params: Partial<TrackSynthParams> } }
  | { type: 'TOGGLE_MUTE'; payload: number }
  | { type: 'TOGGLE_SOLO'; payload: number };

const initialState: SynthState = {
  tracks: Array.from({ length: ROWS }, () => ({ ...DEFAULT_TRACK_PARAMS })),
};

function synthReducer(state: SynthState, action: SynthAction): SynthState {
  switch (action.type) {
    case 'SET_TRACK_PARAMS': {
      const { row, params } = action.payload;
      const tracks = state.tracks.map((t, i) =>
        i === row ? { ...t, ...params } : t
      );
      return { ...state, tracks };
    }
    case 'TOGGLE_MUTE': {
      const row = action.payload;
      const tracks = state.tracks.map((t, i) =>
        i === row ? { ...t, mute: !t.mute } : t
      );
      return { ...state, tracks };
    }
    case 'TOGGLE_SOLO': {
      const row = action.payload;
      const tracks = state.tracks.map((t, i) =>
        i === row ? { ...t, solo: !t.solo } : t
      );
      return { ...state, tracks };
    }
    default:
      return state;
  }
}

interface SynthContextValue {
  tracks: TrackSynthParams[];
  setTrackParams: (row: number, params: Partial<TrackSynthParams>) => void;
  toggleMute: (row: number) => void;
  toggleSolo: (row: number) => void;
}

const SynthContext = createContext<SynthContextValue | null>(null);

export function SynthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(synthReducer, initialState);

  const setTrackParams = (row: number, params: Partial<TrackSynthParams>) =>
    dispatch({ type: 'SET_TRACK_PARAMS', payload: { row, params } });
  const toggleMute = (row: number) => dispatch({ type: 'TOGGLE_MUTE', payload: row });
  const toggleSolo = (row: number) => dispatch({ type: 'TOGGLE_SOLO', payload: row });

  return (
    <SynthContext.Provider value={{ tracks: state.tracks, setTrackParams, toggleMute, toggleSolo }}>
      {children}
    </SynthContext.Provider>
  );
}

export function useSynth() {
  const ctx = useContext(SynthContext);
  if (!ctx) throw new Error('useSynth must be used within SynthProvider');
  return ctx;
}
