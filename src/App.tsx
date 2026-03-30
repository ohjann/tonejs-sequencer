import React from "react";
import { motion } from "framer-motion";
import "./styles/1bit-ui.css";
import "./styles/themes.css";
import "./styles/App.css";
import Grid from "./components/Grid";
import TransportBar from "./components/TransportBar";
import ScaleSelector from "./components/ScaleSelector";
import PatternSelector from "./components/PatternSelector";
import PatternChain from "./components/PatternChain";
import MasterVolume from "./components/MasterVolume";
import { PatternPresetSelect } from "./components/PresetBrowser";
import Sidebar from "./components/Sidebar";
import { SequencerProvider } from "./contexts/SequencerContext";
import { TransportProvider } from "./contexts/TransportContext";
import { SynthProvider } from "./contexts/SynthContext";
import { UIProvider } from "./contexts/UIContext";
import { useAudioEngine } from "./audio/useAudioEngine";

function AudioEngineConnector() {
  useAudioEngine();
  return null;
}

const panelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  return (
    <UIProvider>
      <SequencerProvider>
        <TransportProvider>
          <SynthProvider>
            <AudioEngineConnector />
            <div className="onebit flex flex-col h-screen overflow-hidden crt">
              <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-auto flex justify-center items-start">
                  <motion.div
                    className="bit-card my-4 mx-2"
                    style={{ padding: '1.5rem 2rem' }}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <motion.div variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.05, duration: 0.2 }}>
                      <ScaleSelector />
                    </motion.div>
                    <motion.div variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.1, duration: 0.2 }}>
                      <PatternSelector />
                    </motion.div>
                    <motion.div variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.12, duration: 0.2 }}>
                      <PatternPresetSelect />
                    </motion.div>
                    <motion.div variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.15, duration: 0.2 }}>
                      <Grid />
                    </motion.div>
                    <motion.div variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.2, duration: 0.2 }}>
                      <TransportBar />
                    </motion.div>
                    <motion.div className="controls" variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.25, duration: 0.2 }}>
                      <MasterVolume />
                    </motion.div>
                    <motion.div variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.3, duration: 0.2 }}>
                      <PatternChain />
                    </motion.div>
                  </motion.div>
                </main>
                <Sidebar />
              </div>
            </div>
          </SynthProvider>
        </TransportProvider>
      </SequencerProvider>
    </UIProvider>
  );
}

export default App;
