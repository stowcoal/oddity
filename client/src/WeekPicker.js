import React, {Component} from 'react';
import Moment from 'moment';
import {withRouter} from 'react-router-dom';

class WeekPicker extends Component {
  render() {
    var weeks = Moment().week() - 34;
    var weeksArray = Array(weeks).fill().map((_, i) => i + 1);
    return (
      <nav>
        <ul className="pagination">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">Week</a>
          </li>
          {
            weeksArray.map((week, index) => (
              <li className={"page-item" + (this.props.location.pathname.endsWith('/' + week) && ' active')} key={index}><a className="page-link" href={"/games/week/" + week}>{week}</a></li>
            ))
          }
          <li className={"page-item" + (this.props.location.pathname.endsWith('games') && ' active')}><a className="page-link" href="/games">&gt;&gt;</a></li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(WeekPicker);
