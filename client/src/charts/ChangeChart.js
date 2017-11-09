import React from 'react';
import {Line} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

const ChangeDataset = function(lines, absolute) {
  var data = {};
  if (lines) {
    var totalChange = 0;
    var prevSpread = lines[0].spread;
    data = {
      fill: false,
      borderColor: RandomColor(),
      lineTension: 0,
      label: (absolute ? 'Absolute' : 'Net') + ' ' + 'Change',
      data: lines.map(function(line, index) {
        totalChange += absolute ? Math.abs(line.spread - prevSpread) : line.spread - prevSpread;
        prevSpread = line.spread;
        return {
          t: line.timestamp,
          y: totalChange
        };
      })
    }
  }
  return data;

};

const ChangeChart = function(props) {
  const data = {
    datasets: [
      ChangeDataset(props.game.lines, true),
      ChangeDataset(props.game.lines, false)
    ]
  };
  var options = {
    layout: {
      padding: {
        left: 20 // padding so the scalelable isn't cutoff
      }
    },
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

export default ChangeChart;
