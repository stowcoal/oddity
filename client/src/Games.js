import React, {Component} from 'react';
import Game from './Game.js';

class Games extends Component {
  state = {
    games: []
  }

  componentDidMount() {
    fetch('/games')
      .then(res => res.json())
      .then(games => this.setState({games}));
  }

  render() {
    return (
      <div>
        <h1>Games</h1>
        <div className="container">
        <div className="card-columns">
            {this.state.games.map(function(game) {
                return (
                  <div className="card">
                  <div className="card-body" key={game._id}>
                    <Game game={game} />
                  </div>
                  </div>
                );
            })
          }
        </div>
      </div>
      </div>
    )
  }
}

export default Games;
