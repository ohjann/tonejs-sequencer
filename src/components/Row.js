import React from 'react'
import PropTypes from 'prop-types'
import Square from './Square'
import styles from '../styles/App.css';

const Row = ({ row, rowIndex, activeColumn, onSquareClick }) => (
  <div className={ styles.row }>
    { row.map((square, colIndex) => (
        <Square key={rowIndex+"-"+colIndex}
          toggled={Boolean(square)}
          active={colIndex === activeColumn}
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
