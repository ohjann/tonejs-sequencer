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
          {isPlaying ? (
            <><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="1" y="1" width="3" height="10"/><rect x="8" y="1" width="3" height="10"/></svg>Pause</>
          ) : (
            <><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><polygon points="2,1 11,6 2,11"/></svg>Play</>
          )}
        </button>
        <button
          className="bit-button transport-btn"
          onClick={handleStop}
          title="Stop"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="1" y="1" width="10" height="10"/></svg>Stop
        </button>
      </div>
      <BpmControl />
      <SwingControl />
    </div>
  );
};

export default TransportBar;
