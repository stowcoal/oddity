import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

const GameTitle = function (props) {
  var currentSpread = props.game.lines[props.game.lines.length - 1].spread;
  return (
    <div>
      {props.game.away} ({currentSpread > 0 && '+'}{currentSpread}) @ {props.game.home} - <Moment format="dddd h:mm A">{props.game.start}</Moment>
    </div>
  );
}

export default GameTitle;
