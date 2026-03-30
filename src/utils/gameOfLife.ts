const ROWS = 12;
const COLS = 12;

function countNeighbors(grid: number[][], row: number, col: number): number {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < grid.length && c >= 0 && c < (grid[0]?.length ?? 0)) {
        if (grid[r][c] > 0) count++;
      }
    }
  }
  return count;
}

export function nextGeneration(grid: number[][]): number[][] {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const next: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const neighbors = countNeighbors(grid, r, c);
      const alive = grid[r][c] > 0;
      if (alive && (neighbors === 2 || neighbors === 3)) {
        next[r][c] = 1;
      } else if (!alive && neighbors === 3) {
        next[r][c] = 1;
      }
    }
  }
  return next;
}

export function randomSeed(rows: number = ROWS, cols: number = COLS): number[][] {
  const grid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  const totalCells = rows * cols;
  const fillCount = Math.floor(totalCells * 0.2);

  let placed = 0;
  while (placed < fillCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (grid[r][c] === 0) {
      grid[r][c] = 1;
      placed++;
    }
  }
  return grid;
}

export function gridsEqual(a: number[][], b: number[][]): boolean {
  for (let r = 0; r < a.length; r++) {
    for (let c = 0; c < (a[0]?.length ?? 0); c++) {
      if ((a[r][c] > 0) !== (b[r][c] > 0)) return false;
    }
  }
  return true;
}

export function gridEmpty(grid: number[][]): boolean {
  return grid.every(row => row.every(cell => cell === 0));
}
