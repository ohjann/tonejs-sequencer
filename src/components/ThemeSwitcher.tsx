import React from "react";
import { useUI, THEMES, Theme } from "../contexts/UIContext";

export default function ThemeSwitcher() {
  const { state, setTheme } = useUI();

  return (
    <select
      className="bit-select"
      value={state.theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      style={{ fontSize: "0.8em", padding: "2px 8px", height: "28px" }}
    >
      {THEMES.map((t) => (
        <option key={t.id} value={t.id}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
