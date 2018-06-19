import {MainSynth, BackingSynth} from '../synth';

const playSynth = store => next => action => {
  let state = store.getState().matrix
  if (state.currentlyPlaying) {
    let column = state.activeColumn === state.matrix[0].length - 1 ? 0 : state.activeColumn + 1;
    for (let row = 0; row < state.matrix.length; row++) {
      if (state.matrix[row][column] === 1) {
        MainSynth.triggerAttackRelease(MainSynth.pentatonic[row], "4n", "+0.05", 0.8);
      }
    }
  }
  next(action);
}

export default playSynth;
