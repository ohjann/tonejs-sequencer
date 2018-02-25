import matrix from './matrix';
import synth from './synth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  matrix,
  synth
});

export default rootReducer;
