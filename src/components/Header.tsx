import React from "react";
import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import UndoRedo from "./UndoRedo";
import ExportWav from "./ExportWav";
import ExportMidi from "./ExportMidi";
import { useUI } from "../contexts/UIContext";

export default function Header() {
  const { toggleSidebar, state } = useUI();

  return (
    <motion.header
      className="flex items-center justify-between px-4 py-2 border-b-2"
      style={{
        borderColor: "var(--1bit-fg)",
        background: "var(--1bit-bg)",
        minHeight: 48,
      }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center gap-3">
        <h1
          className="font-bold tracking-tight"
          style={{ fontSize: "1.1em", color: "var(--1bit-fg)", margin: 0 }}
        >
          Sequencer
        </h1>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <ThemeSwitcher />
        <UndoRedo />
        <ExportWav />
        <ExportMidi />
        <button
          className="bit-button md:hidden"
          onClick={toggleSidebar}
          style={{ fontSize: "0.8em", padding: "2px 8px" }}
          aria-label="Toggle synth panel"
        >
          {state.sidebarOpen ? "Close" : "Synth"}
        </button>
      </div>
    </motion.header>
  );
}
