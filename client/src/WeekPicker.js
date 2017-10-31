import React from 'react';

const WeekPicker = function(props) {
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item disabled">
          <a className="page-link" href="#" tabIndex="-1">Week</a>
        </li>
        <li className="page-item"><a className="page-link" href="/games/week/8">8</a></li>
        <li className="page-item"><a className="page-link" href="/games/week/9">9</a></li>
      </ul>
    </nav>
  )
}

export default WeekPicker;
