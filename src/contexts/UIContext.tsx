import React, { createContext, useContext, useReducer, useEffect } from "react";

export type Theme = "classic" | "crt-green" | "inverse" | "midnight" | "hacker";

export const THEMES: { id: Theme; label: string; crt: boolean }[] = [
  { id: "classic", label: "Classic", crt: true },
  { id: "crt-green", label: "CRT Green", crt: true },
  { id: "inverse", label: "Inverse", crt: false },
  { id: "midnight", label: "Midnight", crt: false },
  { id: "hacker", label: "Hacker", crt: true },
];

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  selectedTrack: number | null;
}

type UIAction =
  | { type: "SET_THEME"; theme: Theme }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR"; open: boolean }
  | { type: "SET_SELECTED_TRACK"; track: number | null };

const initialState: UIState = {
  theme: "classic",
  sidebarOpen: false,
  selectedTrack: null,
};

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.theme };
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
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  setSelectedTrack: (track: number | null) => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
    const themeDef = THEMES.find((t) => t.id === state.theme);
    document.documentElement.setAttribute(
      "data-crt",
      themeDef?.crt ? "true" : "false"
    );
  }, [state.theme]);

  const value: UIContextValue = {
    state,
    setTheme: (theme) => dispatch({ type: "SET_THEME", theme }),
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
