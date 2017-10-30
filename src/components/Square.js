import React from "react";
import styles from "../App.css";
import classnames from 'classnames/bind';
import PropTypes from 'prop-types'

const Square = ({ onClick, active }) => (
  <div className={classnames(styles.square, { [styles.active]: active === true })}
    onClick={onClick} >
  </div>
);

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
}

export default Square;
