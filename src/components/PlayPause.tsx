import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectCurrentlyPlaying, play, pause } from '../reducers/matrix';
import '../styles/PlayPause.css';

const PlayPause = () => {
  const currentlyPlaying: boolean = useAppSelector(selectCurrentlyPlaying);
  const dispatch = useAppDispatch();
  const handlePlayback = () => {
      if (currentlyPlaying) {
        dispatch(play());
      } else {
        dispatch(pause());
      }
  }
  return (
    <div className='playpause'>
      <input type="checkbox" value="None" id="playpause" name="check" defaultChecked={true}/>
      <label htmlFor="playpause" tabIndex={1}
        onClick={handlePlayback}
      ></label>
    </div>
  )
};

export default PlayPause;
