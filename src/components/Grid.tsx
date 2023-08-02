import React from 'react'
import Row from './Row';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectMatrix, selectActiveColumn, toggleCell, ICoordinates } from '../reducers/matrix';
import '../styles/App.css';

const Grid = () => {
  const matrix = useAppSelector(selectMatrix);
  const activeColumn = useAppSelector(selectActiveColumn);
  const dispatch = useAppDispatch();
  return (
    <div className='grid'>
      { matrix.map((row, rowIndex) => (
        <Row key={rowIndex+"-"}
          row={row}
          rowIndex={rowIndex}
          activeColumn={activeColumn}
          onSquareClick={(coords: ICoordinates) => dispatch(toggleCell(coords))}
        />
      ))}
    </div>
  );
}

export default Grid;
