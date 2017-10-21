import React, { Component } from "react";
import styles from "../App.css";
import classnames from 'classnames/bind';

export default class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {"squareState":"inactive"};
  }

  render() {
    let classNames = classnames(styles.square, { [styles.active]: this.state.squareState === "active" });
    return (
      <div className={ classNames }
        onClick={this.toggleSquareState.bind(this)}>
      </div>
    );
  }

  toggleSquareState() {
    var css = ( this.state.squareState === "active" ) ? "inactive" : "active";
    console.log(css);
    this.setState({ "squareState": css });
  }
}

