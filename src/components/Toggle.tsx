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
          background: value ? 'var(--1bit-fg)' : 'var(--1bit-bg)',
          border: '2px solid var(--1bit-fg)',
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
            background: value ? 'var(--1bit-bg)' : 'var(--1bit-fg)',
            transition: 'left 0.1s',
          }}
        />
      </div>
      {label && <label htmlFor={id} style={{ fontSize: '0.75em', color: 'var(--1bit-fg)', cursor: 'pointer' }} onClick={() => onChange(!value)}>{label}</label>}
    </div>
  );
};

export default Toggle;
