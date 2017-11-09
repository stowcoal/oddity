import React, {Component} from 'react';
import SpreadChart from './charts/SpreadChart.js';
import GameTitle from './GameTitle.js';
import ChangeChart from './charts/ChangeChart.js';
import Moment from 'react-moment';
import 'moment-timezone';

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
        {
          this.state.games.map(function(game) {
            return (
              <div id={game._id} key={game._id}>
                <h4>
                  <a href={'/game/' + game._id}><GameTitle game={game} /></a>
                </h4>
                <div><Moment format="ddd MMM D YYYY h:mm A">{game.start}</Moment>
                <div className='row'>
                  <div className='col-md-6'>
                    <SpreadChart game={game} />
                  </div>
                  <div className='col-md-6'>
                    <ChangeChart game={game} />
                  </div>
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
