import React from 'react';

export const Game = props => {
  const game = props.game;
  return (
    <div className="game">
      <div className="game-image-container">
        <a href={game.url}>
          <img src={game.thumbnail} alt={game.name + 'image'} className="thumbnail"/>
        </a>
      </div>
      <div className="game-info-container">
        <div className="game-info">
          <div className="name">
            <a href={game.url}>
              {game.name}
            </a>
          </div>
          <div className="rating">
            BGG Rating: {game.rating}
          </div>
          <div className="year">
            Complexity: {game.complexity}
          </div>
          <div className="players">
            Players: {game.numPlayers.min}-{game.numPlayers.max}
          </div>
          <div className="playtime">
            Play time: {game.playTime.min}-{game.playTime.max} min
          </div>
        </div>
      </div>
    </div>
  );
};
