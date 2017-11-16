import React, {Component} from 'react';
import SpreadTimeChart from '../charts/SpreadTimeChart.js';
import GameTitle from '../GameTitle.js';
import ChangeChart from '../charts/ChangeChart.js';
import OverunderTimeChart from '../charts/OverunderTimeChart.js';
import CoverString from '../CoverString.js';
import Moment from 'react-moment';
import 'moment-timezone';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      game: {}
    }
    this.coverString = this.coverString.bind(this);
  }
  componentDidMount() {
    var url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ODDITY_API : '') + '/game/' + this.props.match.params.gameId;

    fetch(url)
      .then(res => res.json())
      .then(game => this.setState({game}));
  }

  coverString() {
  }

  render() {
    return (
      <div className="container">
        <h2>
          <GameTitle game={this.state.game} />
        </h2>
        <div><Moment format="ddd MMM D YYYY h:mm A">{this.state.game.start}</Moment></div>
        <div><CoverString game={this.state.game} /></div>
        <h3>Spread over Time</h3>
        <SpreadTimeChart game={this.state.game} />
        <h3>Spread Change over Time</h3>
        <ChangeChart game={this.state.game} />
        <h3>Overunder over Time</h3>
        <OverunderTimeChart game={this.state.game} />
      </div>
    );
  }
}

export default Game;
