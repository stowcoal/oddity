import React, {Component} from 'react';
import Moment from 'moment';

class WeekPicker extends Component {
  render() {
    var weeks = Moment().week() - 34;
    var weeksArray = Array(weeks).fill().map((_, i) => i + 1);
    return (
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" href="#" data-toggle="dropdown">Select Week</button>
        <div class="dropdown-menu">
          <a className="dropdown-item" href="/week">Upcoming</a>
          {
            weeksArray.map((week, index) => (
              <a className="dropdown-item" href={"/week/" + week} key={index}>{week}</a>
            ))
          }
        </div>
      </div>
    )
  }
}

export default WeekPicker;
