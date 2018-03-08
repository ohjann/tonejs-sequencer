import synth from '../synth';

const playSynth = store => next => action => {
  let state = store.getState().matrix
  if (state.currentlyPlaying) {
    for (let row = 0; row < state.matrix.length; row++) {
      let column = state.activeColumn === state.matrix[row].length - 1 ? 0 : state.activeColumn + 1;
      if (state.matrix[row][column] === 1) {
        synth.triggerAttackRelease( synth.pentatonic[row], "8n", "+0.05");
      }
    }
  }
  next(action);
}

export default playSynth;
