import React from "react";
import styles from "../styles/synth.css";
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const SynthButton = ({ toggleTone }) => (
    <div className={styles.synthButton}
    onClick={toggleTone} >
</div>
);

SynthButton.propTypes = {
    toggleTone: PropTypes.func.isRequired,
}

export default SynthButton;
