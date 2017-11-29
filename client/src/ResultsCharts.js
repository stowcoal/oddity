import React, {Component} from 'react';
import ResultsChart from './charts/ResultsChart.js';
import ErrorChart from './charts/ErrorChart.js';
import SpreadScoreChart from './charts/SpreadScoreChart.js';
import SpreadErrorChart from './charts/SpreadErrorChart.js';
import ErrorMarginChart from './charts/ErrorMarginChart.js';
import SpreadErrorPercentChart from './charts/SpreadErrorPercentChart.js';
import SpreadTotalChart from './charts/SpreadTotalChart';
import CategoryCoverChart from './charts/CategoryCoverChart';
import GameFilter from './GameFilter';

class ResultsCharts extends Component {
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
    this.setState({games: games})
  }

  render() {
    return (
      <div>
        <GameFilter games={this.props.games} update={this.updateGames}/>
        { this.state.games && this.state.games.length > 0 &&
          (
            <div>
              <CategoryCoverChart games={this.state.games}/>
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
          )
        }
      </div>
    );
  }
}

export default ResultsCharts;
