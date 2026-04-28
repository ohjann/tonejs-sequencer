import React from 'react';
import { useTransport } from '../contexts/TransportContext';
import { Play, Power } from 'pixelarticons/react';
import BpmControl from './BpmControl';
import SwingControl from './SwingControl';

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="5" y="3" width="5" height="18"/><rect x="14" y="3" width="5" height="18"/>
  </svg>
);

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
          {isPlaying ? (
            <><PauseIcon />Pause</>
          ) : (
            <><Play width={16} height={16} />Play</>
          )}
        </button>
        <button
          className="bit-button transport-btn"
          onClick={handleStop}
          title="Stop"
        >
          <Power width={16} height={16} />Stop
        </button>
      </div>
      <BpmControl />
      <SwingControl />
    </div>
  );
};

export default TransportBar;
