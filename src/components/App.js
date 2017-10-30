import React, { Component } from 'react';
import styles from '../App.css';
import GridContainer from '../containers/GridContainer';
import ProgressColumn from '../containers/ProgressColumn';

class App extends Component {
  render() {
    return (
      <div className={ styles.App }>
        <ProgressColumn />
        <GridContainer />
      </div>
    );
  }
}

export default App;
