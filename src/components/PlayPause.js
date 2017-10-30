import React from 'react'
import PropTypes from 'prop-types'
import styles from '../App.css';

const PlayPause = ({ currentlyRunning, playPause }) => (
  <div className={ styles.playpause }
    onClick={playPause}
  >
  </div>
);

PlayPause.propTypes = {
  currentlyRunning: PropTypes.bool.isRequired,
  playPause: PropTypes.func.isRequired
}

export default PlayPause;
