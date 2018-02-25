import React from "react";
import styles from "../styles/synth.css";
import classNames from 'classnames/bind';
import PropTypes from 'prop-types'

const SynthButton = ({ onButtonClick, playing }) => (
    <div className={classNames(styles.synthButton,
        { [styles.active]: playing === true },
    )}
    onClick={onButtonClick} >
</div>
);

SynthButton.propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    playing: PropTypes.bool.isRequired,
}

export default SynthButton;
