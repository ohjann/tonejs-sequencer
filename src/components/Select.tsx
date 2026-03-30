import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, label }) => {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
      {label && <span style={{ fontSize: '0.75em', color: 'var(--1bit-fg)' }}>{label}</span>}
      <select
        className="bit-select"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
