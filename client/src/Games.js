import React, {Component} from 'react';
import SpreadChart from './charts/SpreadChart.js';
import GameTitle from './GameTitle.js';
import ChangeChart from './charts/ChangeChart.js';
import CoverString from './CoverString.js';
import Moment from 'react-moment';
import 'moment-timezone';

class Games extends Component {
  render() {
    return (
      <div>
        {
          this.props.games && this.props.games.map(function(game) {
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
                    <SpreadChart game={game} />
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
