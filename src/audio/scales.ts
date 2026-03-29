export type ScaleName =
  | 'pentatonic'
  | 'major'
  | 'minor'
  | 'blues'
  | 'chromatic'
  | 'dorian'
  | 'mixolydian'
  | 'wholeTone'
  | 'harmonicMinor';

export type RootNote = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';

export const SCALE_DISPLAY_NAMES: Record<ScaleName, string> = {
  pentatonic: 'Pentatonic',
  major: 'Major',
  minor: 'Minor',
  blues: 'Blues',
  chromatic: 'Chromatic',
  dorian: 'Dorian',
  mixolydian: 'Mixolydian',
  wholeTone: 'Whole Tone',
  harmonicMinor: 'Harmonic Minor',
};

export const SCALE_NAMES: ScaleName[] = [
  'pentatonic',
  'major',
  'minor',
  'blues',
  'chromatic',
  'dorian',
  'mixolydian',
  'wholeTone',
  'harmonicMinor',
];

export const ROOT_NOTES: RootNote[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const SCALE_INTERVALS: Record<ScaleName, number[]> = {
  pentatonic: [0, 2, 4, 7, 9],
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  blues: [0, 3, 5, 6, 7, 10],
  chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  wholeTone: [0, 2, 4, 6, 8, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
};

export function generateScaleNotes(scaleName: ScaleName, rootNote: RootNote, count: number): string[] {
  const intervals = SCALE_INTERVALS[scaleName];
  const rootIndex = NOTE_NAMES.indexOf(rootNote);
  const notes: string[] = [];

  for (let octave = 7; octave >= 1 && notes.length < count; octave--) {
    for (const interval of [...intervals].sort((a, b) => b - a)) {
      const noteSemitone = rootIndex + interval;
      const noteIndex = noteSemitone % 12;
      const octaveOffset = Math.floor(noteSemitone / 12);
      const actualOctave = octave + octaveOffset;
      notes.push(`${NOTE_NAMES[noteIndex]}${actualOctave}`);
      if (notes.length >= count) break;
    }
  }

  return notes;
}
