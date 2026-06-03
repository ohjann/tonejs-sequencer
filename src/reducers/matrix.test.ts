import reducer, {
  toggleCell,
  nextColumn,
  play,
  pause,
  IMatrixState,
} from "./matrix";

const baseState = (): IMatrixState => ({
  matrix: Array.from(Array(12), () => Array(12).fill(0)),
  activeColumn: 0,
  currentlyPlaying: false,
  interval: null,
});

test("toggleCell flips a cell on and back off", () => {
  const on = reducer(baseState(), toggleCell({ row: 2, col: 3 }));
  expect(on.matrix[2][3]).toBe(1);

  const off = reducer(on, toggleCell({ row: 2, col: 3 }));
  expect(off.matrix[2][3]).toBe(0);
});

test("nextColumn advances and wraps around at the last column", () => {
  const advanced = reducer(baseState(), nextColumn());
  expect(advanced.activeColumn).toBe(1);

  const atEnd = { ...baseState(), activeColumn: 11 };
  expect(reducer(atEnd, nextColumn()).activeColumn).toBe(0);
});

test("play and pause toggle the playing flag", () => {
  const playing = reducer(baseState(), play(undefined));
  expect(playing.currentlyPlaying).toBe(true);

  const paused = reducer(playing, pause());
  expect(paused.currentlyPlaying).toBe(false);
});
