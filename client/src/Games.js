import React, {Component} from 'react';
import Game from './Game.js';
import GridButton from './GridButton.js';

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
    var url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ODDITY_API : '') + '/games';

    if (this.props.week) {
      url = url + '/' + this.props.week;
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
        {false && <nav className="navbar navbar-light navbar-expand bg-light justify-content-between">
          <ul className="navbar-nav float-right">
            <GridButton columns="1" onClick={this.updateColumns}/>
            <GridButton columns="2" onClick={this.updateColumns}/>
            <GridButton columns="4" onClick={this.updateColumns}/>
          </ul>
        </nav>}
        <div className="row">
          {this.state.games.map(function(game) {
              return (
                <div className={'col-md-' + (12 / this.state.columns)} key={game._id}>
                  <Game game={game} />
                </div>
              );
          }, this)
        }
        </div>
      </div>
    )
  }
}

export default Games;
