export const toggleCell = (row, column) => {
  console.log('toggling cell:', row, column);
  return {
      type: 'TOGGLE_CELL',
      row,
      column,
  };
}
