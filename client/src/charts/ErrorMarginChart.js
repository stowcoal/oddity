import React from 'react';
import {Pie} from 'react-chartjs-2';

var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];

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
        backgroundColor: Object.keys(results).map(function(result, index){
          return default_colors[index % 20];
        })
      }
    ]
  };

  return <div>
    <h3>Spreads within a margin of {props.margin} points</h3>
    <Pie data={data} />
  </div>;
}

export default SpreadScoreErrorChart;
