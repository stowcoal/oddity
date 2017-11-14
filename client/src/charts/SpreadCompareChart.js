import React from 'react';
import {Bar} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

function buildData(games, useAbsolute) {
  games.sort((a,b) => (a.lines[a.lines.length-1].spread - b.lines[b.lines.length-1].spread));
  return {
    labels: games.map((game) => (game.away + ' @ ' + game.home)),
    datasets: [{
      data: games.map((game) => (game.lines[game.lines.length-1].spread)),
      backgroundColor: RandomColor(games.length)
    }]
  }
}

const SpreadCompareChart = function(props) {
  const options = {
    legend: { display: false },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Spread'
        }
      }],
      xAxes: [{
        gridLines: { display: false },
        ticks: { display: false },
        scaleLabel: {
          display: true,
          labelString: 'Games'
        }
      }]
    }
  };

  return (
    <Bar data={buildData(props.games, props.absolute)} options={options}/>
  );
}

export default SpreadCompareChart;
