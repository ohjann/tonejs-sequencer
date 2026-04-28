import React from 'react'
import { useTransport } from '../contexts/TransportContext';

const PlayPause = () => {
  const { isPlaying, play, pause } = useTransport();
  const handlePlayback = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }
  return (
    <div className='playpause bit-button'>
      <input type="checkbox" value="None" id="playpause" name="check" defaultChecked={true}/>
      <label htmlFor="playpause" tabIndex={1}
        onClick={handlePlayback}
      ></label>
    </div>
  )
};

export default PlayPause;
