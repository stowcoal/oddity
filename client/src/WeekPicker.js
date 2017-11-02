import React from 'react';

const WeekPicker = function(props) {
  var weeks = [1,2,3,4,5,6,7,8,9];
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item disabled">
          <a className="page-link" href="#" tabIndex="-1">Week</a>
        </li>
        {
          weeks.map(function(week){
            return <li className="page-item"><a className="page-link" href={"/games/week/" + week}>{week}</a></li>;
          })
        }
      </ul>
    </nav>
  )
}

export default WeekPicker;
