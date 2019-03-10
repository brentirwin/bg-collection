import React from 'react';
import { Game } from './Game.js';

export class GamesList extends React.Component {

	render() {
		console.log(this.props.games);
		if (this.props.games.length === 0) {
			return (
				<div id="loading">
					<h3>Loading...</h3>
					BGG's API can be slow... feel free to <a href='.'>refresh</a>.
				</div>
			);
		}

		const filteredGames = this.props.games.filter( game => {
			if (this.props.filter.numPlayers) {
				if (this.props.numPlayers === 10 && game.numPlayers.max >= 10)
					return game;
				if (this.props.numPlayers >= game.numPlayers.min &&
						this.props.numPlayers <= game.numPlayers.max)
					return game;
				return null;
			} else return game;
		}).filter( game => {
			if (this.props.filter.playTime) {
				if ((game.playTime.min >= this.props.playTime[0]) &&
						(game.playTime.min <= this.props.playTime[1]))
					return game;
				if ((game.playTime.max >= this.props.playTime[0]) &&
						(game.playTime.max <= this.props.playTime[1]))
					return game;
				return null;
			} else return game;
		}).filter( game => {
			if (this.props.filter.complexity) {
				if ((game.complexity >= this.props.complexity[0]) &&
						(game.complexity <= this.props.complexity[1]))
					return game;
				return null;				
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
