import React, {Component} from 'react';
import Games from '../Games.js';
import WeekPicker from '../WeekPicker.js';

class ListWeekGames extends Component {
  constructor(props){
    super(props);
    this.state = {
      games: []
    };
    this.getTitle = this.getTitle.bind(this);
  }
  componentDidMount() {
    var url = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ODDITY_API : '') + '/games/week';

    if (this.props.match.params.week)
      url += '/' + this.props.match.params.week;

    fetch(url)
      .then(res => res.json())
      .then(games => this.setState({games}))
      .catch(function () {
        console.log("Request failed");
      });
  }
  getTitle() {
    if (this.props.match.params.week) {
      return "Week " + this.props.match.params.week + " Games";
    }
    else {
      return "Upcoming Games";
    }
  }
  render () {
    return (
    <div className="container">
      <h1>{this.getTitle()}</h1>
      <div className="d-flex justify-content-end">
        <WeekPicker />
      </div>
      <Games games={this.state.games} />
    </div>
  );
  }
}

export default ListWeekGames;
