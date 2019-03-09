import React from 'react';
import { Game } from './Game.js';

export const GamesList = props => {
  const games = props.games.map((game, index) => (
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
