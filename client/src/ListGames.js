import React, {Component} from 'react';
import Games from './Games.js';
import WeekPicker from './WeekPicker.js';

class ListGames extends Component {
  constructor(props){
    super(props);
    this.state = {
      week: props.match.params.week
    };
    this.updateWeek = this.updateWeek.bind(this);
  }
  updateWeek(state) {
    this.setState(state);
  }
  render () {
    return (
    <div className="container">
      <h1>Games</h1>
      <div className="d-flex justify-content-end">
        <WeekPicker />
      </div>
      <Games week={this.state.week} />
    </div>
  );
  }
}

export default ListGames;
