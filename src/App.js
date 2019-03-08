import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {xml} from './devXML.js';
import { GamesList } from './GamesList.js';
const convert = require('xml-js');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'brentirwin',
      games: []
    };
  }

  componentDidMount() {
/*
    const url =
      'https://boardgamegeek.com/xmlapi2/collection?username=' +
      this.state.username +
      '&stats=1';
    axios.get(url).then(res => {
      const data = JSON.parse(
        convert.xml2json(res.data, { compact: true, spaces: 2 })
      );
      this.setState({ games: data.items.item });
    });
*/
    const data = JSON.parse(
      convert.xml2json(xml, { compact: true, spaces: 2})
    );
    this.setState({ games: data.items.item });
  }

  render() {
    return (
      <div className="App">
          <h1>My Board Games</h1>
          <GamesList games={this.state.games} />
      </div>
    );
  }
}

export default App;
