import React, { Component } from 'react';
import styles from '../App.css';
import Grid from './Grid.js';

class App extends Component {
  render() {
    return (
      <div className={ styles.App }>
        <Grid />
      </div>
    );
  }
}

export default App;
