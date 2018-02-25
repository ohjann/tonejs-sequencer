import { connect } from 'react-redux'
import { triggerAttack } from '../actions/synth';
import synth from '../synth';
import SynthButton from '../components/SynthButton'

function mapStateToProps(state, props) {
  return {
    oscillator: state.synth.oscillator,
    envelope: state.synth.envelope,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    toggleTone: () => {
      synth.triggerAttackRelease("C4", "8n");
    }
  }
}

const SynthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SynthButton)

export default SynthContainer;
