import React from 'react';
import {Bar} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

const ErrorChart = function(props) {
  var results = props.games.reduce(function(res, game){
    if (game.score && game.lines.length){
      var diff = Number(game.score.away) - Number(game.score.home);
      diff = Math.ceil(Math.abs(diff - Number(game.lines[game.lines.length-1].spread)));
      if (typeof res[diff] === 'undefined')
        res[diff] = 1;
      else
        res[diff] += 1;
    }
    return res;
  }, {});

  var labels = [];
  if (Object.keys(results).length) {
    var min = Object.keys(results).reduce(function(a,b){
      return Math.min(a,b);
    });
    var max = Object.keys(results).reduce(function(a,b){
      return Math.max(a,b);
    });
    for(min; min < max+1; ++min){
      labels.push(min);
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        legend: { display: false },
        data: labels.map(function(result){
          return results[result] || 0;
        }),
        backgroundColor: RandomColor(labels.length)
      }
    ]
  };

  const options = {
    legend: { display: false },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Spreads'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Spread Score Difference'
        }
      }]
    }
  }

  return <div>
    <Bar data={data} options={options} />
  </div>;
}

export default ErrorChart;
