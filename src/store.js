import { createStore, applyMiddleware } from 'redux';
import progressColumn from './middleware/progressColumn';
import playSynth from './middleware/playSynth';
import rootReducer from  './reducers';

export default(initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      playSynth,
      progressColumn
    )
  );
}
