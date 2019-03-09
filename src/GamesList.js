import React from 'react';
import { Game } from './Game.js';

export class GamesList extends React.Component {

	render() {

		const filteredGames = this.props.games.filter( game => {
			if (this.props.filter.numPlayers) {
				if (this.props.numPlayers === 10 && game.players.max >= 10)
					return game;
				else if (this.props.numPlayers >= game.players.min &&
						this.props.numPlayers <= game.players.max)
					return game;
				else return null;
			} else return game;
		}).filter( game => {
			if (this.props.filter.playTime) {
				if (this.props.playTime === 0 && game.playtime.min <= 15)
					return game;
				else if (this.props.playTime === 120)
					return game;
				else if (this.props.playTime >= game.playtime.min)
					return game;
				else return null;
			} else return game;
		});

	  const games = filteredGames.map((game, index) => (
	    <li key={index}>
	      <Game game={game} />
	    </li>
	  ));
	  return (
	  	<div className="gamesList">
	  		<ul className="gamesList">{games}</ul>
	  	</div>
	  	);
	}
}
