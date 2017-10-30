import { connect } from 'react-redux'
import { nextColumn } from '../actions/matrix'
import PlayPause from '../components/PlayPause'

function mapStateToProps(state, props) {
  return {
    currentlyRunning: state.matrix.currentlyRunning
  }
}

function mapDispatchToProps(dispatch) {
  return {
    playPause: () => {
      dispatch(nextColumn());
    }
  }
}

const ProgressColumn = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPause)

export default ProgressColumn;
