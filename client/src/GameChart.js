import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

const GameChart = function(props) {
  const data = {
    datasets: [
      {
        fill: false,
        borderColor: 'rgb(64, 65, 71)',
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
          stepSize: .5
        }
      }]
    }
  };
  return <Line data={data} options={options} />;
}

export default GameChart;
