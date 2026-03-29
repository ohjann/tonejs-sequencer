import React from 'react'
import Row from './Row';
import { useSequencer, ICoordinates } from '../contexts/SequencerContext';
import { useTransport } from '../contexts/TransportContext';
import '../styles/App.css';

const Grid = () => {
  const { matrix, toggleCell } = useSequencer();
  const { activeStep } = useTransport();
  return (
    <div className='grid'>
      { matrix.map((row, rowIndex) => (
        <Row key={rowIndex+"-"}
          row={row}
          rowIndex={rowIndex}
          activeColumn={activeStep}
          onSquareClick={(coords: ICoordinates) => toggleCell(coords)}
        />
      ))}
    </div>
  );
}

export default Grid;
