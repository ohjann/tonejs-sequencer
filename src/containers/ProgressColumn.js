import { connect } from 'react-redux'
import { nextColumn } from '../actions/matrix'
import PlayPause from '../components/PlayPause'

function mapStateToProps(state, props) {
  return {
    currentlyRunning: state.matrix.currentlyRunning
  }
}

function mapDispatchToProps(dispatch) {
  let running = null;
  return {
    playPause: () => {
      if (!running) {
        dispatch(nextColumn());
        clearInterval(running);
        running = setInterval(() => {
          dispatch(nextColumn());
        }, 700);
      } else {
        clearInterval(running);
        running = null;
      }
    }
  }
}

const ProgressColumn = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPause)

export default ProgressColumn;
