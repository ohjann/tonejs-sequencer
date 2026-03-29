import React, { useCallback, useRef } from 'react';

interface KnobProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

const KNOB_MIN_ANGLE = -135;
const KNOB_MAX_ANGLE = 135;

const Knob: React.FC<KnobProps> = ({ value, onChange, min = 0, max = 1, label }) => {
  const dragRef = useRef<{ startY: number; startValue: number } | null>(null);

  const normalized = (value - min) / (max - min);
  const angle = KNOB_MIN_ANGLE + normalized * (KNOB_MAX_ANGLE - KNOB_MIN_ANGLE);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragRef.current) return;
    const delta = (dragRef.current.startY - e.clientY) / 100;
    const newNorm = Math.min(1, Math.max(0, (dragRef.current.startValue - min) / (max - min) + delta));
    onChange(min + newNorm * (max - min));
  }, [min, max, onChange]);

  const onMouseUp = useCallback(() => {
    dragRef.current = null;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { startY: e.clientY, startValue: value };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [value, onMouseMove, onMouseUp]);

  const cx = 24;
  const cy = 24;
  const r = 18;
  const indicatorAngleRad = ((angle - 90) * Math.PI) / 180;
  const ix = cx + r * 0.65 * Math.cos(indicatorAngleRad);
  const iy = cy + r * 0.65 * Math.sin(indicatorAngleRad);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      {label && <span style={{ fontSize: '0.75em', color: 'var(--bit-color0)' }}>{label}</span>}
      <svg
        width={48}
        height={48}
        onMouseDown={onMouseDown}
        style={{ cursor: 'ns-resize', userSelect: 'none' }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="var(--bit-color1)"
          stroke="var(--bit-color0)"
          strokeWidth={2}
        />
        <line
          x1={cx}
          y1={cy}
          x2={ix}
          y2={iy}
          stroke="var(--bit-color0)"
          strokeWidth={2}
          strokeLinecap="square"
        />
      </svg>
      <span style={{ fontSize: '0.7em', color: 'var(--bit-color0)' }}>{value.toFixed(2)}</span>
    </div>
  );
};

export default Knob;
