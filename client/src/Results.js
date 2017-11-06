import React, {Component} from 'react';
import ResultsChart from './charts/ResultsChart.js';
import ScatterChart from './charts/ScatterChart.js';
import SpreadScoreDiffChart from './charts/SpreadScoreDiffChart.js'

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
        <SpreadScoreDiffChart games={this.state.games} />
        <ScatterChart games={this.state.games} />
        <ResultsChart games={this.state.games} />
      </div>
    );
  }
}

export default Results;
