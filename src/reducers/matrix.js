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
};

export default(state = initialState, action) => {
//const matrix = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_COLUMN':
      return state.activeColumn + 1;

    case 'TOGGLE_CELL':
      let newMatrix = state.matrix.map(inner => inner.slice());
      newMatrix[action.row][action.column] = 1 - newMatrix[action.row][action.column];
      return Object.assign({}, state, {
        matrix: newMatrix,
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
