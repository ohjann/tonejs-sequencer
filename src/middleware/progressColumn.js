import { nextColumn } from '../actions/matrix'

const progressColumn = store => next => action => {
  if (action.type === 'PLAY') {
    action.interval = setInterval(() => store.dispatch(nextColumn()), 500);
  }
  else if (action.type === 'PAUSE') {
    clearInterval(store.getState().matrix.interval);
  }
  next(action);
};

export default progressColumn;
