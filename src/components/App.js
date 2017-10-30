import React, { Component } from 'react';
import styles from '../App.css';
import GridContainer from '../containers/GridContainer';

class App extends Component {
  render() {
    return (
      <div className={ styles.App }>
        <GridContainer />
      </div>
    );
  }
}

export default App;
