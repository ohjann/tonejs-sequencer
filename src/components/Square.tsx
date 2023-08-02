import React from "react";
import "../styles/App.css";
import PropTypes from 'prop-types'

interface IProps {
  onClick: Function;
  active: boolean;
  toggled: boolean;
}

const Square = ({ onClick, active, toggled }: IProps) => (
  <div
    className={`${active ? 'active' : toggled ? 'toggled' : ''}`}
    onClick={() => onClick()} >
  </div>
);

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
}

export default Square;
