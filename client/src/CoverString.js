import React from 'react';

const CoverString = function(props) {
  var coverString = "";
    if (props.game.score) {
      if ((props.game.score.away - props.game.score.home) > props.game.lines[props.game.lines.length-1].spread)
        coverString = props.game.away + " Cover";
      else if ((props.game.score.away - props.game.score.home) < props.game.lines[props.game.lines.length-1].spread)
        coverString = props.game.home + " Cover";
      else
        coverString = "Push";
    }

    return <div>{coverString}</div>;
}

export default CoverString;
