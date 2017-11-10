import React, {Component} from 'react';
import Games from './Games.js';

class ListGames extends Component {
  constructor(props){
    super(props);
    this.state = {
      games: []
    };
  }
  componentDidMount() {
    var url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ODDITY_API : '') + '/games';

    fetch(url)
      .then(res => res.json())
      .then(games => this.setState({games}));
  }
  render () {
    return (
    <div className="container">
      <h1>All Games</h1>
      <Games games={this.state.games.slice(0,10)} />
    </div>
  );
  }
}

export default ListGames;
