import React from 'react';
import { Game } from './Game.js';

export class GamesList extends React.Component {

	filter(games, filter, which, target) {
		return games.filter(
			game => {
				if (filter)
					if (target >= game[which].min && target <= game[which].max)
						return game;
					else return null;
				return game;
			}
		);
	}

	render() {

		const filteredGames = this.filter(this.filter(this.props.games,
																									this.props.filter.numPlayers,
																									'players',
																									this.props.numPlayers),
																					 this.props.filter.playTime,
																					 'playtime',
																					 this.props.playTime);

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
