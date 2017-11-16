import React from 'react';
import {Bar} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

function buildData(games, useAbsolute) {
  var results = games.reduce(function(res, game){
    if (game.lines){
      var scores = game.lines[game.lines.length-1].spread;
      if (typeof res[scores] === 'undefined')
        res[scores] = 1;
      else
        res[scores] += 1;
    }
    return res;
  }, {});

  var labels = Object.keys(results);
  labels.sort((a,b)=>(a-b));

  return {
    labels: labels,
    datasets: [{
      label: '',
      data: labels.map(function(spread){
        return results[spread] || 0;
      }),
      backgroundColor: RandomColor(Object.keys(results).length)
    }]
  }
}

const SpreadTotalChart = function(props) {
  const options = {
    legend: { display: false },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Games'
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Spread'
        }
      }]
    }
  };

  return (
    <Bar data={buildData(props.games, props.absolute)} options={options}/>
  );
}

export default SpreadTotalChart;
