import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {xml} from './devXML.js';

class App extends Component {
  render() {
    return (
      <div className="App">
          <p>
						{xml}
					</p>
      </div>
    );
  }
}

export default App;
