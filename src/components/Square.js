import React from "react";
import styles from "../App.css";
import classNames from 'classnames/bind';
import PropTypes from 'prop-types'

const Square = ({ onClick, active, toggled }) => (
    <div className={classNames(styles.square,
        { [styles.active]: active === true },
        { [styles.toggled]: toggled === true },
    )}
    onClick={onClick} >
  </div>
);

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
}

export default Square;
