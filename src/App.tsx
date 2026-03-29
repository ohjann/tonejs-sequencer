import React from "react";
import "./styles/1bit-ui.css";
import "./styles/App.css";
import Grid from "./components/Grid";
import TransportBar from "./components/TransportBar";
import UndoRedo from "./components/UndoRedo";
import ExportWav from "./components/ExportWav";
import ScaleSelector from "./components/ScaleSelector";
import PatternSelector from "./components/PatternSelector";
import PatternChain from "./components/PatternChain";
import { SequencerProvider } from "./contexts/SequencerContext";
import { TransportProvider } from "./contexts/TransportContext";
import { SynthProvider } from "./contexts/SynthContext";
import { useAudioEngine } from "./audio/useAudioEngine";

function AudioEngineConnector() {
  useAudioEngine();
  return null;
}

function App() {
  return (
    <SequencerProvider>
      <TransportProvider>
        <SynthProvider>
        <AudioEngineConnector />
        <div className="flex justify-center items-center content-center h-screen overflow-auto crt">
          <div className="bit-card">
            <ScaleSelector />
            <PatternSelector />
            <Grid />
            <TransportBar />
            <div className="controls">
              <UndoRedo />
              <ExportWav />
            </div>
            <PatternChain />
          </div>
        </div>
        </SynthProvider>
      </TransportProvider>
    </SequencerProvider>
  );
}

export default App;
