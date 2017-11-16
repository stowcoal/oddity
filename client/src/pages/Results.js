import React, {Component} from 'react';
import ResultsCharts from '../ResultsCharts';


class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
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
        <h1>Aggregate Data</h1>
        <ResultsCharts games={this.state.games} />
      </div>
    );
  }
}

export default Results;
