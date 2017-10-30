import React, { Component } from 'react';
import Square from './Square.js';
import styles from '../App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matrixActions from '../actions/matrix';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }; 

  renderRow(row, rowIndex, width) {
    var squares = [];
    for(var i=0; i<width; i++) {
      squares.push(
        <Square
          active={row[i]}
          key={"square-"+rowIndex+"-"+i}
          index={rowIndex+"-"+i}
          toggleCell={this.props.actions.toggleCell}
        />
      );
    }
    return squares;
  }

  renderGrid(matrix) {
    var rows = [];
    for(var i=0; i<matrix.length; i++) {
      rows.push(
        <div className={ styles.row } key={"row-"+ i}>
          { this.renderRow(matrix[i], i, matrix[i].length) }
        </div>
      );
    }
    return rows;
  }

  render() {
    return (
      <div className={ styles.grid }>
        { this.renderGrid(this.props.matrix) }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    matrix: state.matrix.matrix,
    activeColumn: state.matrix.activeColumn,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(matrixActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
