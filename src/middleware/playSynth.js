import synth from '../synth';

const playSynth = store => next => action => {
  let state = store.getState().matrix
  if (state.currentlyPlaying) {
    state.matrix.forEach((row) => {
      let index = state.activeColumn === row.length - 1 ? 0 : state.activeColumn + 1;
      if (row[index] === 1) {
        synth.triggerAttackRelease("C4", "8n");
      }
    });
  }
  next(action);
}

export default playSynth;
