import React from 'react';

export const Game = props => {
  const game = {
    id: props.game._attributes.objectid,
    name: props.game.name._text,
    rating: Math.round(parseFloat(props.game.stats.rating.average._attributes.value) * 100) /100,
    thumbnail: props.game.thumbnail._text,
    year: props.game.yearpublished._text,
    players: {
      min: parseInt(props.game.stats._attributes.minplayers),
      max: parseInt(props.game.stats._attributes.maxplayers)
    },
    playtime: {
      min: parseInt(props.game.stats._attributes.minplaytime),
      max: parseInt(props.game.stats._attributes.maxplaytime)
    }
  };
  console.log(props.game);
  return (
    <div>
      <img src={game.thumbnail} alt={game.name + 'image'} />
      <div id="name"><b>
        <a href={'https://boardgamegeek.com/boardgame/' + game.id}>
          {game.name}
        </a>
      </b></div>
      <div id="rating">BGG Rating: {game.rating}</div>
      <div id="year">Published in {game.year}</div>
      <div id="players">Players: {game.players.min}-{game.players.max}</div>
      <div id="playtime">Play time: {game.playtime.min}-{game.playtime.max}</div>
    </div>
  );
};
