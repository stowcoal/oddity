import React from 'react';
import SpreadChart from './charts/SpreadChart.js';
import GameTitle from './GameTitle.js';
import ChangeChart from './charts/ChangeChart.js';

const Game = function(props) {
  return (
    <div id={props.game._id}>
      <h3>
        <GameTitle game={props.game} />
      </h3>
      <div className='row'>
        <div className='col-md-6'>
          <SpreadChart game={props.game} />
        </div>
        <div className='col-md-6'>
          <ChangeChart game={props.game} />
        </div>
      </div>
    </div>
  );
}

export default Game;
