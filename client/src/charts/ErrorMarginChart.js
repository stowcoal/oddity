import React from 'react';
import {Pie} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

const SpreadScoreErrorChart = function(props) {
  var results = props.games.reduce(function(res, game){
    if (game.score && game.lines.length){
      var diff = Number(game.score.away) - Number(game.score.home);
      diff = Math.ceil(Math.abs(diff - Number(game.lines[game.lines.length-1].spread)) / props.margin);
      if (typeof res[diff] === 'undefined')
        res[diff] = 1;
      else
        res[diff] += 1;
    }
    return res;
  }, {});

  const data = {
    labels: Object.keys(results),
    datasets: [
      {
        label: 'Spread/Score error',
        data: Object.values(results),
        backgroundColor: RandomColor(Object.keys(results).length)
      }
    ]
  };

  const options = {
    legend: { display: false },
  }

  return <div>
    <Pie data={data} options={options}/>
  </div>;
}

export default SpreadScoreErrorChart;
