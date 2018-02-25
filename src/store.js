import { createStore, applyMiddleware } from 'redux';
import progressColumn from './middleware/progressColumn';
import rootReducer from  './reducers';

export default(initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(progressColumn)
  );
}
