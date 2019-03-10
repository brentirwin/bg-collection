import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import {xml} from './dev-xml.js';
import {xml_e} from './xml-extended.js';
import { GamesList } from './GamesList.js';
import { Filters } from './Filters.js';
const convert = require('xml-js');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'brentirwin',
      numPlayers: 5,
      playTime: 30,
      filter: {
        numPlayers: false,
        playTime: false
      },
      games: []
    };

    this.handleNumPlayersChange = this.handleNumPlayersChange.bind(this);
    this.handlePlayTimeChange = this.handlePlayTimeChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleNumPlayersChange(value) {
    // const str = (value === 10) ? '10+' : value.toString();
    // const players = { string: str, num: value };
    this.setState({ numPlayers: value });
  }

  handlePlayTimeChange(value) {
    // const str = (value === 0) ? '<15'
    //       : (value === 120) ? '120+'
    //       : value.toString();
    // const time = { string: str, num: value };
    this.setState({ playTime: value });
  }

  handleCheck(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    
    let filter = {...this.state.filter};
    filter[name] = value;

    this.setState({ filter: filter });
  }

  async componentDidMount() {
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
      convert.xml2json(xml_e, { compact: true, spaces: 2})
    );

    const games = (data.items.item).map(game => {

      const getCategory = (cat) => {
        return game.link.filter(link => {
          return (link._attributes.type === cat) ? link : null;
        }).map(link => {
          return link._attributes.value;
        });
      };

      return {
        id:         game._attributes.id,
        name:       Array.isArray(game.name)
                    ? game.name[0]._attributes.value
                    : game.name._attributes.value,
        rating:     Math.round(parseFloat(
                      game.statistics.ratings.average._attributes.value
                    ) * 100) / 100,
        thumbnail:  game.thumbnail._text,
        year:       game.yearpublished._attributes.value,
        numPlayers: {
          min:      parseInt(game.minplayers._attributes.value),
          max:      parseInt(game.maxplayers._attributes.value)
        },
        playTime: {
          min:      parseInt(game.minplaytime._attributes.value),
          max:      parseInt(game.maxplaytime._attributes.value)
        },
        url:        'https://boardgamegeek.com/boardgame/'
                    + game._attributes.id,
        description: game.description._text,
        categories: getCategory('boardgamecategory'),
        mechanics:  getCategory('boardgamemechanic'),
        designer:   getCategory('boardgamedesigner')[0],
        complexity: Math.round(parseFloat(
                      game.statistics.ratings.averageweight._attributes.value
                    ) * 100) / 100
      }
    });

    console.log(games);
    this.setState({ games: games });
  }

  render() {
    return (
      <div className="App">
          <h1>My Board Games</h1>
          <Filters
            handleNumPlayersChange={this.handleNumPlayersChange}
            numPlayers={this.state.numPlayers}
            handlePlayTimeChange={this.handlePlayTimeChange}
            playTime={this.state.playTime}
            handleCheck={this.handleCheck}
            filter={this.state.filter}
          />
          <GamesList
            games={this.state.games}
            filter={this.state.filter}
            numPlayers={this.state.numPlayers.num}
            playTime={this.state.playTime.num}
          />
      </div>
    );
  }
}

export default App;
