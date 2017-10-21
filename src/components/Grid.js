import React, { Component } from 'react';
import Square from './Square.js';
import styles from '../App.css';

export default class Grid extends Component {
  renderRow(width) {
    var squares = [];
    for(var i=0; i<width; i++) {
      squares.push(<Square key={"square-"+i}/>);
    }
    return squares;
  }

  renderGrid(width,height) {
    var rows = [];
    for(var i=0; i<height; i++) {
      rows.push(<div className={ styles.row } key={"row-"+ i}> { this.renderRow(width) }</div>);
    }
    return rows;
  }

  render() {
    return (
      <div className={ styles.grid }>
        { this.renderGrid(16,16) }
      </div>
    );
  }
}

