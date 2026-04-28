import * as Tone from 'tone';

function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const numSamples = buffer.length;
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const dataLength = numSamples * numChannels * bytesPerSample;
  const headerLength = 44;
  const totalLength = headerLength + dataLength;

  const arrayBuffer = new ArrayBuffer(totalLength);
  const view = new DataView(arrayBuffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // RIFF header
  writeString(0, 'RIFF');
  view.setUint32(4, totalLength - 8, true);
  writeString(8, 'WAVE');

  // fmt chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * bytesPerSample, true);
  view.setUint16(32, numChannels * bytesPerSample, true);
  view.setUint16(34, bitsPerSample, true);

  // data chunk
  writeString(36, 'data');
  view.setUint32(40, dataLength, true);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = buffer.getChannelData(ch)[i];
      const clamped = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, clamped * 0x7fff, true);
      offset += 2;
    }
  }

  return arrayBuffer;
}

export async function exportPatternAsWav(matrix: number[][], bpm: number, scaleNotes: string[]): Promise<void> {
  const cols = matrix[0]?.length ?? 0;
  if (cols === 0) return;

  // 8th note duration in seconds
  const stepDuration = 60 / bpm / 2;
  // Render one full cycle plus extra tail for release
  const duration = cols * stepDuration + 4;

  const toneBuffer = await Tone.Offline(({ transport }) => {
    const delay = new Tone.FeedbackDelay('4n', 0.6).toDestination();
    const synth = new Tone.PolySynth(Tone.Synth);
    synth.set({
      oscillator: { type: 'triangle8' },
      envelope: { attack: 0.2, decay: 4, sustain: 1, release: 4 },
    });
    synth.connect(delay);
    synth.toDestination();

    transport.bpm.value = bpm;

    for (let step = 0; step < cols; step++) {
      const time = step * stepDuration;
      for (let row = 0; row < matrix.length; row++) {
        if (matrix[row][step] === 1) {
          const note = scaleNotes[row];
          if (note) {
            transport.schedule((t) => {
              synth.triggerAttackRelease(note, '8n', t);
            }, time);
          }
        }
      }
    }

    transport.start();
  }, duration);

  const audioBuffer = toneBuffer.get();
  if (!audioBuffer) return;

  const wav = audioBufferToWav(audioBuffer);
  const blob = new Blob([wav], { type: 'audio/wav' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pattern.wav';
  a.click();
  URL.revokeObjectURL(url);
}
