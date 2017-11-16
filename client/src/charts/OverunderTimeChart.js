import React from 'react';
import {Line} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

const OverunderTimeChart = function(props) {
  var data = {};
  if (props.game.lines){
    console.log(props.game.lines)
    var overunders = props.game.lines.filter(function(line) {
      return line.overunder > 0;
    })
    data = {
      datasets: [
        {
          fill: false,
          borderColor: RandomColor(),
          lineTension: 0,
          label: 'Overunder',
          data: overunders.map(line => (
            {
              t: line.timestamp,
              y: line.overunder
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

export default OverunderTimeChart;
