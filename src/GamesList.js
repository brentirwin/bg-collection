import React from 'react';
import { Game } from './Game.js';

export const GamesList = props => {
  const games = props.games.map((game, index) => (
    <li key={index}>
      <Game game={game} />
    </li>
  ));
  return <ul>{games}</ul>;
}
