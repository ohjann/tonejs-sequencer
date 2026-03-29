import React, { useId } from 'react';

interface ToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange, label }) => {
  const id = useId();

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div
        onClick={() => onChange(!value)}
        style={{
          display: 'inline-block',
          width: 40,
          height: 20,
          background: value ? 'var(--bit-color0)' : 'var(--bit-color1)',
          border: '2px solid var(--bit-color0)',
          position: 'relative',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
        role="switch"
        aria-checked={value}
        aria-label={label}
        tabIndex={0}
        onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') onChange(!value); }}
      >
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: value ? 'calc(100% - 14px)' : 2,
            width: 12,
            height: 12,
            background: value ? 'var(--bit-color1)' : 'var(--bit-color0)',
            transition: 'left 0.1s',
          }}
        />
      </div>
      {label && <label htmlFor={id} style={{ fontSize: '0.75em', color: 'var(--bit-color0)', cursor: 'pointer' }} onClick={() => onChange(!value)}>{label}</label>}
    </div>
  );
};

export default Toggle;
