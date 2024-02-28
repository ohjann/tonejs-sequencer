import React from "react";
import "../styles/App.css";

interface IProps {
  onClick: Function;
  active: boolean;
  toggled: boolean;
}

const Square = ({ onClick, active, toggled }: IProps) => (
  <div
    className={`square ${active ? "active" : ""} ${toggled ? "toggled" : ""}`}
    onClick={() => onClick()}
  />
);

export default Square;
