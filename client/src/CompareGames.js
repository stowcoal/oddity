import React, {Component} from 'react';
import CompareChart from './CompareChart';

class CompareGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    fetch((process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ODDITY_API : '') + '/games')
      .then(res => res.json())
      .then(games => this.setState({games: games}));
  }


  render () {
    return (
      <div className="container">
        <CompareChart games={this.state.games}/>
      </div>
    )
  }
}

export default CompareGames;
