export interface PatternPreset {
  name: string;
  grid: number[][];
}

const ROWS = 12;
const COLS = 12;

function emptyGrid(): number[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function makeGrid(cells: [number, number][]): number[][] {
  const grid = emptyGrid();
  for (const [r, c] of cells) {
    if (r < ROWS && c < COLS) grid[r][c] = 1;
  }
  return grid;
}

export const patternPresets: PatternPreset[] = [
  {
    name: 'Arpeggio Up',
    grid: makeGrid([
      [11, 0], [9, 1], [7, 2], [5, 3],
      [11, 4], [9, 5], [7, 6], [5, 7],
      [11, 8], [9, 9], [7, 10], [5, 11],
    ]),
  },
  {
    name: 'Arpeggio Down',
    grid: makeGrid([
      [0, 0], [2, 1], [4, 2], [6, 3],
      [0, 4], [2, 5], [4, 6], [6, 7],
      [0, 8], [2, 9], [4, 10], [6, 11],
    ]),
  },
  {
    name: 'Chord Stabs',
    grid: makeGrid([
      [11, 0], [8, 0], [5, 0],
      [11, 4], [8, 4], [5, 4],
      [11, 8], [8, 8], [5, 8],
    ]),
  },
  {
    name: 'Bassline',
    grid: makeGrid([
      [11, 0], [11, 2], [11, 3],
      [9, 4], [9, 6],
      [11, 8], [11, 10], [10, 11],
    ]),
  },
  {
    name: 'Scatter',
    grid: makeGrid([
      [3, 0], [8, 1], [1, 3], [10, 4],
      [5, 5], [0, 7], [7, 8], [11, 9],
      [2, 10], [6, 11],
    ]),
  },
  {
    name: 'Diagonal',
    grid: makeGrid([
      [0, 0], [1, 1], [2, 2], [3, 3],
      [4, 4], [5, 5], [6, 6], [7, 7],
      [8, 8], [9, 9], [10, 10], [11, 11],
    ]),
  },
  {
    name: 'Pulse',
    grid: makeGrid([
      [11, 0], [11, 1], [11, 2], [11, 3],
      [11, 4], [11, 5], [11, 6], [11, 7],
      [11, 8], [11, 9], [11, 10], [11, 11],
    ]),
  },
  {
    name: 'Call & Response',
    grid: makeGrid([
      [11, 0], [9, 1], [7, 2],
      [5, 6], [3, 7], [1, 8],
    ]),
  },
];
