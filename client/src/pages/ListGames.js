import React, {Component} from 'react';
import Games from '../Games.js';

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
      .then(games => this.setState({games}))
      .catch(function () {
        console.log("Request failed");
      });
  }
  render () {
    return (
    <div className="container">
      <h1>All Games</h1>
      <Games games={this.state.games} />
    </div>
  );
  }
}

export default ListGames;
