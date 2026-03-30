import React from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({ value, onChange, min = 0, max = 1, label, step }) => {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75em', color: 'var(--bit-color0)' }}>
          <span>{label}</span>
          <span>{value.toFixed(2)}</span>
        </div>
      )}
      <input
        type="range"
        className="bit-1bit-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default Slider;
