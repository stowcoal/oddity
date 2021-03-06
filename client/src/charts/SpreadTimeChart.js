import React from 'react';
import {Line} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

const SpreadTimeChart = function(props) {
  var data = {};
  if (props.game.lines){
    data = {
      datasets: [
        {
          fill: false,
          borderColor: RandomColor(),
          lineTension: 0,
          label: 'Spread',
          data: props.game.lines.map(line => (
            {
              t: line.timestamp,
              y: line.spread
            }
          ))
        }
      ]
    };
  }
  var options = {
    layout: {
      padding: {
        left: 30 // padding so the scalelable isn't cutoff
      }
    },
    legend: { display: false },
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
    }
  };
  return <Line data={data} options={options} />;
}

export default SpreadTimeChart;
