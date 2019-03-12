import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { GamesList } from './GamesList.js';
import { Filters } from './Filters.js';
import { user, defaults } from './config.js';
const convert = require('xml-js');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: user.username,
      numPlayers: defaults.numPlayers,
      playTime: defaults.playTime,
      complexity: defaults.complexity,
      filter: {
        numPlayers: false,
        playTime: false,
        complexity: false
      },
      games: []
    };

    this.handleNumPlayersChange = this.handleNumPlayersChange.bind(this);
    this.handlePlayTimeChange = this.handlePlayTimeChange.bind(this);
    this.handleComplexityChange = this.handleComplexityChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleNumPlayersChange(value) {
    this.setState({ numPlayers: value });
  }

  handlePlayTimeChange(value) {
    this.setState({ playTime: value });
  }

  handleComplexityChange(value) {
    this.setState({ complexity: value });
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

    async function getData(username) {
      const url =
        'https://boardgamegeek.com/xmlapi2/collection?username='
        + username;

      const userData = await axios.get(url).then(res => {
        const data = JSON.parse(
          convert.xml2json(res.data, { compact: true, spaces: 2 })
        );
        return data.items.item;
      });

      const url2 = 
        'https://boardgamegeek.com/xmlapi2/thing?id='
        + userData.map( game => game._attributes.objectid ).join(',')
        + '&stats=1';

      const games = await axios.get(url2).then(res => {
        const data = JSON.parse(
          convert.xml2json(res.data, { compact: true, spaces: 2 })
        );
        return data.items.item;
      });
      return games;
    }
    const rawGames = await getData(this.state.username);

    const games = (rawGames).map(game => {

      const getCategory = (cat) => {
        return game.link.filter(link => {
          return (link._attributes.type === cat) ? link : null;
        }).map(link => {
          return link._attributes.value;
        });
      };

      const decodeHTML = (html) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
      }

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
        description: decodeHTML(game.description._text),
        categories: getCategory('boardgamecategory'),
        mechanics:  getCategory('boardgamemechanic'),
        designer:   getCategory('boardgamedesigner')[0],
        complexity: Math.round(parseFloat(
                      game.statistics.ratings.averageweight._attributes.value
                    ) * 100) / 100
      }
    });

    this.setState({ games: games });
  }

  render() {
    return (
      <div className="App">
          <h1>{user.name}'s Board Games</h1>
          <Filters
            handleNumPlayersChange={this.handleNumPlayersChange}
            numPlayers={this.state.numPlayers}

            handlePlayTimeChange={this.handlePlayTimeChange}
            playTime={this.state.playTime}

            handleComplexityChange={this.handleComplexityChange}
            complexity={this.state.complexity}

            handleCheck={this.handleCheck}
            filter={this.state.filter}
          />
          <GamesList
            games={this.state.games}
            filter={this.state.filter}
            numPlayers={this.state.numPlayers}
            playTime={this.state.playTime}
            complexity={this.state.complexity}
          />
      </div>
    );
  }
}

export default App;
