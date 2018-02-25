import synth from '../synth';

const playSynth = store => next => action => {
  let state = store.getState().matrix
  state.matrix.forEach((row) => {
    if (row[state.activeColumn] === 1) {
      synth.triggerAttackRelease("C4", "8n");
    }
  });
  next(action);
}

export default playSynth;
