import React from 'react';

const GameTitle = function (props) {

  var currentSpread;
  if (props.game.lines && props.game.lines.length){
    currentSpread = props.game.lines[props.game.lines.length - 1].spread;
  }
  return (
    <div>
      <div>
        {props.game.away} @ {props.game.home} { currentSpread && ('(' + ((currentSpread > 0) ? '+' : '') + currentSpread + ')' : '')} {props.game.score && ( '(' + props.game.score.away + ' - ' + props.game.score.home + ')' )}
      </div>
    </div>
  );
}

export default GameTitle;
