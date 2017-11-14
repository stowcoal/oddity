import React from 'react';
import {Bar} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

const SpreadCompareChart = function(props) {
  props.games.sort((a,b) => (a.lines[a.lines.length-1].spread - b.lines[b.lines.length-1].spread));
  const data = {
    labels: props.games.map((game) => (game.away + ' @ ' + game.home)),
    datasets: [{
      data: props.games.map((game) => (game.lines[game.lines.length-1].spread)),
      backgroundColor: RandomColor(props.games.length)
    }]
  };

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
    <Bar data={data} options={options}/>
  );
}

export default SpreadCompareChart;
