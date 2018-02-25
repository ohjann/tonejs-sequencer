export const toggleCell = (row, col) => {
  console.log("toggle cell");
  return {
    type: 'TOGGLE_CELL',
    row,
    col,
  };
}
export const play = () => {
  console.log("playing");
  return {
    type: 'PLAY'
  }
}
export const pause = () => {
  console.log("pause");
  return {
    type: 'PAUSE'
  }
}
export const nextColumn = () => {
  console.log("next column");
  return {
    type: 'NEXT_COLUMN'
  }
}
