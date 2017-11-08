import React from 'react';
import {Bar} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

function buildData(games, useAbsolute) {
  var results = games.reduce(function(res, game){
    if (game.score){
      var diff = useAbsolute ? Math.abs(game.score.home - game.score.away) : game.score.home - game.score.away;
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
    for(min; min < max-1; ++min){
      labels.push(min);
    }
  }

  return {
    labels: labels,
    datasets: [{
      label: 'Score Differentials',
      data: labels.map(function(result){
        return results[result];
      }),
      backgroundColor: RandomColor(labels.length)
    }]
  }
}

const ResultsChart = function(props) {
  const options = {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Games'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Score Difference'
        }
      }]
    }
  };

  return (
    <Bar data={buildData(props.games, props.absolute)} options={options}/>
  );
}

export default ResultsChart;
