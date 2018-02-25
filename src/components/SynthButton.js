import React from "react";
import styles from "../styles/synth.css";
import PropTypes from 'prop-types';

const SynthButton = ({ triggerAttackRelease }) => (
    <div className={styles.synthButton}
        onClick={() => triggerAttackRelease("C4","8n")} >
    </div>
);

SynthButton.propTypes = {
    triggerAttackRelease: PropTypes.func.isRequired,
}

export default SynthButton;
