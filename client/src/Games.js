import React, {Component} from 'react';
import Game from './Game.js';

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      columns: 3
    }
    this.updateColumns = this.updateColumns.bind(this);
  }

  componentDidMount() {
    var url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ODDITY_API : '') + '/games/';

    if (this.props.week) {
      url += this.props.week;
    } else {
      url += 'current';
    }
    fetch(url)
      .then(res => res.json())
      .then(games => this.setState({games}));
  }

  updateColumns(option) {
    this.setState(option);
  }

  render() {
    return (
      <div>
        {this.state.games.map(function(game) {
            return (
              <Game game={game} key={game._id} />
            );
          }, this)
        }
      </div>
    )
  }
}

export default Games;
