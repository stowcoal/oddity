import React, {Component} from 'react';
import SpreadCompareChart from './charts/SpreadCompareChart';
import SpreadTotalChart from './charts/SpreadTotalChart';
import SpreadChangeChart from './charts/SpreadChangeChart';

class CompareGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    fetch((process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ODDITY_API : '') + '/games/week')
      .then(res => res.json())
      .then(games => this.setState({games: games}));
  }


  render () {
    return (
      <div className="container">
        <h1>Spreads this Week</h1>
        <SpreadCompareChart games={this.state.games}/>
        <h1>Frequency of Spreads This Week</h1>
        <SpreadTotalChart games={this.state.games}/>
        <h1>Spread Change by Spread Total</h1>
        <SpreadChangeChart games={this.state.games}/>
      </div>
    )
  }
}

export default CompareGames;
