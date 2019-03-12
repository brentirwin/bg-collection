import React from 'react';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      details: { display: 'none' }
    }
    this.showHideDetails = this.showHideDetails.bind(this);
  }

  showHideDetails() {
    if (this.state.visible)
      this.setState({
        details: { display: 'none' },
        visible: false
      });
    else this.setState({
      details: { display: 'block' },
      visible: true
    });
  }

  render() {
    const game = this.props.game;

    return (
      <div className="game" >
        <div className="top-visible" onClick={() => this.showHideDetails()}>
          <div className="game-image-container">
            <img src={game.thumbnail} alt={game.name + 'image'} className="thumbnail"/>
          </div>
          <div className="game-info-container">
            <div className="game-info">
              <div className="name">
                {game.name}
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
        <HiddenBottom visible={this.state.details} game={game}/>
      </div>
    );
  }
};

const HiddenBottom = props => {
  const game = props.game;
  return (
    <div className="bottom-hidden" style={props.visible}>
      <div className="view-on-bgg">  
        <a href={game.url}>View on BoardGameGeek.com</a>
      </div>
      <h4>Categories</h4>
      <Tags tags={game.categories} />
      <h4>Mechanics</h4>
      <Tags tags={game.mechanics} />
      <h4>Designer</h4>
      {game.designer}
      <h4>Description</h4>
      {game.description}
    </div>
  );
}

const Tags = props => {
  const tags = props.tags.map( (tag, index) => (
    <li key={index}>{tag}</li>
  ));
  return (
    <ul>{tags}</ul>
  );
}
