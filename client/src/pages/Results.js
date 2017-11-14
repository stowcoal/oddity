import React, {Component} from 'react';
import ResultsChart from '../charts/ResultsChart.js';
import ErrorChart from '../charts/ErrorChart.js';
import SpreadScoreChart from '../charts/SpreadScoreChart.js';
import SpreadErrorChart from '../charts/SpreadErrorChart.js';
import ErrorMarginChart from '../charts/ErrorMarginChart.js';
import SpreadErrorPercentChart from '../charts/SpreadErrorPercentChart.js';
import SpreadTotalChart from '../charts/SpreadTotalChart';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  };

  componentDidMount() {
    var url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ODDITY_API : '') + '/games';

    fetch(url)
      .then(res => res.json())
      .then(games => this.setState({games}))
      .catch(function () {
        console.log("Request failed");
      });
    }

  render() {
    return (
      <div className="container">
        { this.state.games.length ?
          <div>
            <h3>Spread Error Frequency</h3>
            <ErrorChart games={this.state.games}/>
            <h3>Spread Error within Margin of 7 points</h3>
            <ErrorMarginChart games={this.state.games} margin={7}/>
            <h3>Spread vs Score Difference</h3>
            <SpreadScoreChart games={this.state.games} />
            <h3>Spread vs Error</h3>
            <SpreadErrorChart games={this.state.games} />
            <h3>Spread vs Home Cover Percent</h3>
            <SpreadErrorPercentChart games={this.state.games} />
            <h3>Net Score Difference</h3>
            <ResultsChart games={this.state.games} absolute={false}/>
            <h3>Absolute Score Difference</h3>
            <ResultsChart games={this.state.games} absolute={true}/>
            <h3>Spreads</h3>
            <SpreadTotalChart games={this.state.games}/>
          </div>
          :
          <div></div>
        }
      </div>
    );
  }
}

export default Results;