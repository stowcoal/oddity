import React from 'react';
import {Bar} from 'react-chartjs-2';

var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];

const SpreadScoreDiffChart = function(props) {
  var results = props.games.reduce(function(res, game){
    if (game.score && game.lines.length){
      var diff = Number(game.score.away) - Number(game.score.home);
      diff = Math.abs(diff - Number(game.lines[game.lines.length-1].spread));
      if (typeof res[diff] === 'undefined')
        res[diff] = 1;
      else
        res[diff] += 1;
    }
    return res;
  }, {});

  console.log(results);

  var labels = [];
  if (Object.keys(results).length) {
    var min = Object.keys(results).reduce(function(a,b){
      return Math.min(a,b);
    });
    var max = Object.keys(results).reduce(function(a,b){
      return Math.max(a,b);
    });
    for(min; min < max-1; ++min){
      labels.push(min);
    }
  }


  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Spread/Score error',
        data: labels.map(function(result){
          return results[result];
        }),
        backgroundColor: labels.map(function(result, index){
          return default_colors[index % 20];
        })
      }
    ]
  };

  return <Bar data={data} />;
}

export default SpreadScoreDiffChart;
