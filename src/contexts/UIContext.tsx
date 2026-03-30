import React, { createContext, useContext, useReducer, useEffect } from "react";

export type Theme = "amber" | "classic" | "classic-dark" | "crt-green" | "indigo" | "sharp-wizard";

export const THEMES: { id: Theme; label: string }[] = [
  { id: "amber", label: "Amber CRT" },
  { id: "classic", label: "Classic LCD" },
  { id: "classic-dark", label: "Classic Dark" },
  { id: "crt-green", label: "Green CRT" },
  { id: "indigo", label: "Indigo" },
  { id: "sharp-wizard", label: "Sharp Wizard" },
];

interface UIState {
  theme: Theme;
  crt: boolean;
  sidebarOpen: boolean;
  selectedTrack: number | null;
}

type UIAction =
  | { type: "SET_THEME"; theme: Theme }
  | { type: "TOGGLE_CRT" }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR"; open: boolean }
  | { type: "SET_SELECTED_TRACK"; track: number | null };

const initialState: UIState = {
  theme: "amber",
  crt: true,
  sidebarOpen: false,
  selectedTrack: null,
};

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.theme };
    case "TOGGLE_CRT":
      return { ...state, crt: !state.crt };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "SET_SIDEBAR":
      return { ...state, sidebarOpen: action.open };
    case "SET_SELECTED_TRACK":
      return { ...state, selectedTrack: action.track };
    default:
      return state;
  }
}

interface UIContextValue {
  state: UIState;
  setTheme: (theme: Theme) => void;
  toggleCrt: () => void;
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  setSelectedTrack: (track: number | null) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-crt", state.crt ? "true" : "false");
  }, [state.crt]);

  const value: UIContextValue = {
    state,
    setTheme: (theme) => dispatch({ type: "SET_THEME", theme }),
    toggleCrt: () => dispatch({ type: "TOGGLE_CRT" }),
    toggleSidebar: () => dispatch({ type: "TOGGLE_SIDEBAR" }),
    setSidebar: (open) => dispatch({ type: "SET_SIDEBAR", open }),
    setSelectedTrack: (track) => dispatch({ type: "SET_SELECTED_TRACK", track }),
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
