import React from 'react';
import {Line} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

const CompareChart = function(props) {
  const data = {
    datasets: props.games.map((game, index) => (
      {
        fill: false,
        lineTension: 0,
        borderColor: RandomColor(),
        label: game.away + ' @ ' + game.home,
        data: game.lines.map(line => (
          {
            t: line.timestamp,
            y: line.spread
          }
        ))
      }
    ))
  };
  var options = {
    scales: {
      xAxes: [{
        type: 'time',
        bounds: 'data',
        time: {
          tooltipFormat: 'dddd MMM D h:mm A',
          unit: 'day',
          displayFormats: {
            day: 'MMM D'
          }
        }
      }],
      yAxes: [{
        ticks: {
        }
      }]
    },
    legend: {
      display: false
    }
  };
  return <Line data={data} options={options} height={250}/>;
}

export default CompareChart;
