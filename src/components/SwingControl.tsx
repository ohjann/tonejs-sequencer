import React from 'react';
import { useTransport } from '../contexts/TransportContext';

const SwingControl = () => {
  const { swing, setSwing } = useTransport();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwing(Number(e.target.value));
  };

  return (
    <div className="swing-control">
      <label className="swing-label">Swing</label>
      <input
        type="range"
        className="swing-slider"
        min={0}
        max={1}
        step={0.01}
        value={swing}
        onChange={handleChange}
      />
      <span className="swing-value">{Math.round(swing * 100)}%</span>
    </div>
  );
};

export default SwingControl;
