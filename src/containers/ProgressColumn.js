import { connect } from 'react-redux'
import { play, pause } from '../actions/matrix'
import PlayPause from '../components/PlayPause'

function mapStateToProps(state, props) {
  return {
    currentlyPlaying: state.matrix.currentlyPlaying
  }
}

function mapDispatchToProps(dispatch) {
  return {
    playPause: (event) => {
      // play button
      if (event.target.control.checked) {
        dispatch(play());
      } else {
        dispatch(pause());
      }
    }
  }
}

const ProgressColumn = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPause)

export default ProgressColumn;
