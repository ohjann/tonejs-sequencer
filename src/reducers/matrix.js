var initialState = {
  matrix : [
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0]
  ],
  activeColumn: 0,
  currentlyRunning: false,
};

export default(state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_COLUMN':
      if (state.activeColumn < state.matrix[0].length - 1)
        return Object.assign({}, state, {
          activeColumn: state.activeColumn + 1
        });
      else
        return Object.assign({}, state, {
          activeColumn: 0
        });

    case 'TOGGLE_CELL':
      let newMatrix = state.matrix.map(inner => inner.slice());
      newMatrix[action.row][action.col] = 1 - newMatrix[action.row][action.col];
      return Object.assign({}, state, {
        matrix: newMatrix,
      });

    case 'TOGGLE_RUNNING':
      return Object.assign({}, state, {
        currentlyRunning: !state.currentlyRunning
      });

    default:
      return state;
  }
};


/*** TESTS
const testMatrix = () => {
  let stateBefore = Object.assign({}, initialState);
  let action = {
    type: 'TOGGLE_CELL',
    row: 0,
    column: 0,
  };
  deepFreeze(stateBefore);
  deepFreeze(action);

  let stateAfter = Object.assign({}, initialState);
  stateAfter.matrix = stateAfter.matrix.map(inner => inner.slice());
  stateAfter.matrix[0][0] = 1;

  expect(matrix(stateBefore,action)).toEqual(stateAfter);
}
 ***/
