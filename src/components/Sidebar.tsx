import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "../contexts/UIContext";
import { useSynth, OscillatorType } from "../contexts/SynthContext";
import MasterVolume from "./MasterVolume";
import Knob from "./Knob";
import Select from "./Select";
import { SynthPresetSelect } from "./PresetBrowser";

const OSC_OPTIONS: { value: OscillatorType; label: string }[] = [
  { value: "sine", label: "Sine" },
  { value: "square", label: "Square" },
  { value: "sawtooth", label: "Saw" },
  { value: "triangle", label: "Tri" },
  { value: "triangle8", label: "Tri8" },
];

function TrackControls({ trackIndex }: { trackIndex: number }) {
  const { tracks, setTrackParams } = useSynth();
  const params = tracks[trackIndex];

  return (
    <div className="flex flex-col gap-2 py-2 border-b" style={{ borderColor: "var(--bit-color0)" }}>
      <div className="flex items-center justify-between">
        <span className="font-bold" style={{ fontSize: "0.8em" }}>
          Track {trackIndex + 1}
        </span>
        <SynthPresetSelect trackIndex={trackIndex} />
      </div>
      <Select
        value={params.oscillatorType}
        onChange={(v) => setTrackParams(trackIndex, { oscillatorType: v as OscillatorType })}
        options={OSC_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
        label="Osc"
      />
      <div className="grid grid-cols-4 gap-1">
        <Knob
          value={params.attack}
          onChange={(v) => setTrackParams(trackIndex, { attack: v })}
          min={0}
          max={2}
          label="A"
        />
        <Knob
          value={params.decay}
          onChange={(v) => setTrackParams(trackIndex, { decay: v })}
          min={0}
          max={5}
          label="D"
        />
        <Knob
          value={params.sustain}
          onChange={(v) => setTrackParams(trackIndex, { sustain: v })}
          min={0}
          max={1}
          label="S"
        />
        <Knob
          value={params.release}
          onChange={(v) => setTrackParams(trackIndex, { release: v })}
          min={0}
          max={5}
          label="R"
        />
      </div>
      <Knob
        value={params.filterFrequency}
        onChange={(v) => setTrackParams(trackIndex, { filterFrequency: v })}
        min={20}
        max={20000}
        label="Filter"
      />
    </div>
  );
}

/** Desktop: collapsible right sidebar. Mobile: bottom sheet. */
export default function Sidebar() {
  const { state, toggleSidebar, setSidebar } = useUI();
  const { sidebarOpen, selectedTrack } = state;
  const trackIndex = selectedTrack ?? 0;

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col border-l-2 transition-all duration-200 overflow-hidden"
        style={{
          borderColor: "var(--bit-color0)",
          background: "var(--bit-color1)",
          width: sidebarOpen ? 256 : 40,
          minWidth: sidebarOpen ? 256 : 40,
        }}
      >
        <button
          className="bit-button w-full"
          onClick={toggleSidebar}
          style={{ fontSize: "0.8em", padding: "8px 4px", borderRadius: 0 }}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? "\u25B6" : "\u25C0"}
        </button>
        {sidebarOpen && (
          <motion.div
            className="flex flex-col gap-1 p-2 overflow-y-auto flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <MasterVolume />
            <TrackControls trackIndex={trackIndex} />
          </motion.div>
        )}
      </aside>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-0 md:hidden border-t-2 overflow-y-auto z-50"
            style={{
              borderColor: "var(--bit-color0)",
              background: "var(--bit-color1)",
              maxHeight: "50vh",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between p-2 border-b" style={{ borderColor: "var(--bit-color0)" }}>
              <span className="font-bold" style={{ fontSize: "0.9em" }}>
                Synth Controls
              </span>
              <button
                className="bit-button"
                onClick={() => setSidebar(false)}
                style={{ fontSize: "0.8em", padding: "2px 8px" }}
              >
                Close
              </button>
            </div>
            <div className="p-2 flex flex-col gap-1">
              <MasterVolume />
              <TrackControls trackIndex={trackIndex} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
