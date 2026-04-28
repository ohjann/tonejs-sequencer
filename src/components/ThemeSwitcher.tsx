import React from "react";
import { useUI, THEMES, Theme } from "../contexts/UIContext";

export default function ThemeSwitcher() {
  const { state, setTheme, toggleCrt } = useUI();

  return (
    <div className="flex items-center gap-2">
      <select
        className="bit-select"
        value={state.theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        style={{ fontSize: "0.8em", padding: "2px 8px", height: "28px", flex: 1 }}
      >
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
      <button
        className="bit-button"
        onClick={toggleCrt}
        style={{ fontSize: "0.8em", padding: "2px 8px", height: "28px", whiteSpace: "nowrap" }}
        title="Toggle CRT scanline effect"
      >
        CRT {state.crt ? "ON" : "OFF"}
      </button>
    </div>
  );
}
