import React from 'react';
import { useTransport } from '../contexts/TransportContext';
import BpmControl from './BpmControl';
import SwingControl from './SwingControl';

const TransportBar = () => {
  const { isPlaying, play, pause } = useTransport();

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleStop = () => {
    pause();
  };

  return (
    <div className="transport-bar">
      <div className="transport-buttons">
        <button
          className="bit-button transport-btn"
          onClick={handlePlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          className="bit-button transport-btn"
          onClick={handleStop}
          title="Stop"
        >
          ⏹ Stop
        </button>
      </div>
      <BpmControl />
      <SwingControl />
    </div>
  );
};

export default TransportBar;
