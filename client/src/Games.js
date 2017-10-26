import React, {Component} from 'react';
import Game from './Game.js';

class Games extends Component {
  state = {
    games: []
  }

  componentDidMount() {
    fetch((process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ODDITY_API : '') + '/games')
      .then(res => res.json())
      .then(games => this.setState({games}));
  }

  render() {
    return (
      <div>
        <h1>Games</h1>
        <div className="container">
          <div className="row">
            {this.state.games.map(function(game) {
                return (
                  <div className="col-md-6" key={game._id}>
                    <Game game={game} />
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
