import { connect } from 'react-redux'
import { togglePlaying } from '../actions/synth';
import SynthButton from '../components/SynthButton'

function mapStateToProps(state, props) {
  return {
    playing: state.synth.playing,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onButtonClick: () => {
      dispatch(togglePlaying());
    }
  }
}

const SynthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SynthButton)

export default SynthContainer;
