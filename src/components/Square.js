import React, { Component } from "react";
import styles from "../App.css";
import classnames from 'classnames/bind';

export default class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {"squareState": this.props.active};
  }

  render() {
    let classNames = classnames(styles.square, { [styles.active]: this.state.squareState === 1 });
    return (
      <div className={ classNames }
        onClick={this.toggleSquareState.bind(this, this.props.index)}>
      </div>
    );
  }

  toggleSquareState(index) {
    //var css = ( this.state.squareState === 1 ) ? 0 : 1;
    //this.setState({ "squareState": css });
    let [row,column] = index.split("-");
    this.props.toggleCell(row,column);
  }
}

