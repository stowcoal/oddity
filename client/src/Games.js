import React, {Component} from 'react';
import SpreadTimeChart from './charts/SpreadTimeChart.js';
import GameTitle from './GameTitle.js';
import GameFilter from './GameFilter';
import ChangeChart from './charts/ChangeChart.js';
import CoverString from './CoverString.js';
import Moment from 'react-moment';
import 'moment-timezone';

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: props.games
    }
    this.updateGames = this.updateGames.bind(this);
  }
  componentWillReceiveProps (nextProps) {
    this.setState({games: nextProps.games});
  }
  updateGames(games) {
    this.setState({games: games});
  }
  render() {
    return (
      <div>
        <GameFilter games={this.props.games} update={this.updateGames}/>
        {
          this.state.games.slice(0,10).map(function(game) {
            return (
              <div id={game._id} key={game._id}>
                <h4>
                  <a href={'/game/' + game._id}><GameTitle game={game} /></a>
                </h4>
                <div>
                  <Moment format="ddd MMM D YYYY h:mm A">{game.start}</Moment>
                </div>
                <div>
                  <CoverString game={game} />
                </div>
                <div className='row'>
                  <div className='col-md-6'>
                    <SpreadTimeChart game={game} />
                  </div>
                  <div className='col-md-6'>
                    <ChangeChart game={game} />
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    )
  }

}

export default Games;
