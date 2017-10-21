import React, { Component } from 'react';

import Blob from './Blob.js';

export default class Square extends Component {
  render() {
    var squareStyle = {
      width: '40px',
      height: '100%',
      border: '1px solid #2C3E50',
      borderRadius: '5px',
      display: 'inline-block',
      background: '#FFFFFF'
    };
    return (
      <div style={ squareStyle }>
        <Blob />
      </div>
    );
  }
}

