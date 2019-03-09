import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import {xml} from './dev-xml.js';
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

    const games = (data.items.item).map(game => {
      return {
        id:         game._attributes.objectid,
        name:       game.name._text,
        rating:     Math.round(parseFloat(
                      game.stats.rating.average._attributes.value
                    ) * 100) / 100,
        thumbnail:  game.thumbnail._text,
        year:       game.yearpublished._text,
        players: {
          min:      parseInt(game.stats._attributes.minplayers),
          max:      parseInt(game.stats._attributes.maxplayers)
        },
        playtime: {
          min:      parseInt(game.stats._attributes.minplaytime),
          max:      parseInt(game.stats._attributes.maxplaytime)
        },
        url:        'https://boardgamegeek.com/boardgame/'
                    + game._attributes.objectid,
      }
    });

    this.setState({ games: games });
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
