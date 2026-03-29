import MidiWriter from 'midi-writer-js';
import { PENTATONIC_SCALE } from './scales';

export function exportPatternAsMidi(matrix: number[][], bpm: number): void {
  const cols = matrix[0]?.length ?? 0;
  if (cols === 0) return;

  const track = new MidiWriter.Track();
  track.setTempo(bpm);

  // 128 ticks per beat (default), 8th note = 64 ticks
  const ticksPerStep = 64;

  for (let step = 0; step < cols; step++) {
    const pitches: string[] = [];
    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row][step] === 1) {
        const note = PENTATONIC_SCALE[row];
        if (note) pitches.push(note);
      }
    }
    if (pitches.length > 0) {
      track.addEvent(
        new MidiWriter.NoteEvent({
          pitch: pitches,
          duration: '8',
          tick: step * ticksPerStep,
        })
      );
    }
  }

  const writer = new MidiWriter.Writer(track);
  const bytes = writer.buildFile();
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'audio/midi' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pattern.mid';
  a.click();
  URL.revokeObjectURL(url);
}
