import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/PlayPause.css';

const PlayPause = ({ currentlyPlaying, playPause }) => (
  <div className={ styles.playpause }
  >
    <input type="checkbox" value="None" id="playpause" name="check" defaultChecked="checked"/>
    <label htmlFor="playpause" tabIndex={1}
      onClick={playPause}
    ></label>
  </div>
);

PlayPause.propTypes = {
  currentlyPlaying: PropTypes.bool.isRequired,
  playPause: PropTypes.func.isRequired
}

export default PlayPause;
