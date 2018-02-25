import React, { Component } from 'react';
import styles from '../styles/App.css';
import GridContainer from '../containers/GridContainer';
import ProgressColumn from '../containers/ProgressColumn';

class App extends Component {
  render() {
    return (
      <div className={ styles.App }>
        <GridContainer />
        <ProgressColumn />
      </div>
    );
  }
}

export default App;
