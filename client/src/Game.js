import React from 'react';
import GameChart from './GameChart.js';
import GameTitle from './GameTitle.js';

const Game = function(props) {
  return (
    <div>
      <GameTitle game={props.game} />
      <GameChart game={props.game} />
    </div>
  );
}

export default Game;
