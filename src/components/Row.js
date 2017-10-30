import React from 'react'
import PropTypes from 'prop-types'
import Square from './Square'
import styles from '../App.css';

const Row = ({ row, rowIndex, onSquareClick }) => (
  <div className={ styles.row }>
    { row.map((square, colIndex) => (
        <Square key={rowIndex+"-"+colIndex}
          active={Boolean(square)}
          onClick={() => onSquareClick(rowIndex, colIndex)}
        />
    ))}
  </div>
);

Row.propTypes = {
  row: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  onSquareClick: PropTypes.func.isRequired,
}

export default Row;
