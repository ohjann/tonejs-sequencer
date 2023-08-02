import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface IMatrixState {
  matrix: Array<Array<number>>;
  activeColumn: number;
  currentlyPlaying: boolean;
  interval: any;
}

export interface ICoordinates {
  row: number;
  col: number;
}

const initialState: IMatrixState = {
  matrix: Array.from(Array(12), () => Array(12).fill(0)),
  activeColumn: 0,
  currentlyPlaying: false,
  interval: null,
};


export const matrixSlice = createSlice({
  name: 'matrix',
  initialState,
  reducers: {
    nextColumn: (state) => {
      if (state.activeColumn < state.matrix[0].length - 1) {
        state.activeColumn += 1;
      } else {
        state.activeColumn = 0;
      }
    },
    toggleCell: (state, action: PayloadAction<ICoordinates>) => {
     let newMatrix = state.matrix.map(inner => inner.slice());
     const { row, col } = action.payload;
     newMatrix[row][col] = 1 - newMatrix[row][col];
     state.matrix = newMatrix;
    },
    play: (state, action: PayloadAction) => {
      state.currentlyPlaying = true;
      state.interval = action.payload;
    },
    pause: (state) => {
      state.currentlyPlaying = false;
      state.interval = false;
    },
  }
});

export const selectMatrix = (state: RootState) => state.matrix.matrix;
export const selectActiveColumn = (state: RootState) => state.matrix.activeColumn;
export const selectCurrentlyPlaying = (state: RootState) => state.matrix.currentlyPlaying;
export const { nextColumn, toggleCell, play, pause } = matrixSlice.actions;
export default matrixSlice.reducer;
