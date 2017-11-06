import React, {Component} from 'react';
import ResultsChart from './charts/ResultsChart.js';
import ScatterChart from './charts/ScatterChart.js';
import SpreadScoreErrorChart from './charts/SpreadScoreErrorChart.js'
import ErrorMarginChart from './charts/ErrorMarginChart.js'

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
      .then(games => this.setState({games}));
    }

  render() {
    return (
      <div className="container">
        <SpreadScoreErrorChart games={this.state.games}/>
        <ErrorMarginChart games={this.state.games} margin={7}/>
        <ScatterChart games={this.state.games} />
        <ResultsChart games={this.state.games} />
      </div>
    );
  }
}

export default Results;
