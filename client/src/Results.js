import React, {Component} from 'react';
import ResultsChart from './charts/ResultsChart.js';

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
      <div>
        <ResultsChart games={this.state.games} />
      </div>
    );
  }
}

export default Results;
