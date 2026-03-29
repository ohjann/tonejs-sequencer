import React from "react";
import "./styles/1bit-ui.css";
import "./styles/App.css";
import Grid from "./components/Grid";
import PlayPause from "./components/PlayPause";
import UndoRedo from "./components/UndoRedo";
import ExportWav from "./components/ExportWav";
import { SequencerProvider } from "./contexts/SequencerContext";
import { TransportProvider } from "./contexts/TransportContext";
import { useAudioEngine } from "./audio/useAudioEngine";

function AudioEngineConnector() {
  useAudioEngine();
  return null;
}

function App() {
  return (
    <SequencerProvider>
      <TransportProvider>
        <AudioEngineConnector />
        <div className="App crt">
          <div className="bit-card">
            <Grid />
            <div className="controls">
              <PlayPause />
              <UndoRedo />
              <ExportWav />
            </div>
          </div>
        </div>
      </TransportProvider>
    </SequencerProvider>
  );
}

export default App;
