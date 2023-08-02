import React from 'react'
import Square from './Square'
import '../styles/App.css';
import { ICoordinates } from '../reducers/matrix';

interface IProps {
  row: Array<number>,
  rowIndex: number,
  activeColumn: number,
  onSquareClick: Function;
}

const Row = ({ row, rowIndex, activeColumn, onSquareClick }: IProps) => (
  <div className='row'>
    { row.map((square, colIndex) => (
        <Square key={rowIndex+"-"+colIndex}
          toggled={Boolean(square)}
          active={colIndex === activeColumn}
          onClick={() => onSquareClick({ row: rowIndex, col: colIndex } as ICoordinates)}
        />
    ))}
  </div>
);

export default Row;
