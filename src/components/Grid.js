import React from 'react'
import PropTypes from 'prop-types'
import Row from './Row.js';
import styles from '../App.css';

const Grid = ({matrix, onSquareClick}) => (
  <div className={ styles.grid }>
    { matrix.map((row, rowIndex) => (
      <Row key={rowIndex+"-"}
        row={row}
        rowIndex={rowIndex}
        onSquareClick={onSquareClick}
      />
    ))}
  </div>
);

Grid.propTypes = {
  matrix: PropTypes.array.isRequired,
  onSquareClick: PropTypes.func.isRequired,
}

export default Grid;
