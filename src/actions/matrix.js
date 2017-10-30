export const toggleCell = (row, col) => {
  console.log("toggle cell");
  return {
    type: 'TOGGLE_CELL',
    row,
    col,
  };
}
export const toggleRunning = () => {
  console.log("toggle running");
  return {
    type: 'TOGGLE_RUNNING'
  }
}
export const nextColumn = () => {
  console.log("next column");
  return {
    type: 'NEXT_COLUMN'
  }
}
