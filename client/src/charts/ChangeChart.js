import React from 'react';
import {Line} from 'react-chartjs-2';
import RandomColor from '../helpers/RandomColor.js';

const AbsChangeDataset = function(lines) {
  var totalChange = 0;
  var prevSpread = lines[0].spread;
  return {
    fill: false,
    borderColor: RandomColor(),
    lineTension: 0,
    label: 'Absolute Change',
    data: lines.map(function(line, index) {
      totalChange += Math.abs(line.spread - prevSpread);
      prevSpread = line.spread;
      return {
        t: line.timestamp,
        y: totalChange
      };
    })
  }
};

const NetChangeDataset = function(lines) {
  var totalChange = 0;
  var prevSpread = lines[0].spread;
  return {
    fill: false,
    borderColor: RandomColor(),
    lineTension: 0,
    label: 'Net Change',
    data: lines.map(function(line, index) {
      totalChange += (line.spread - prevSpread);
      prevSpread = line.spread;
      return {
        t: line.timestamp,
        y: totalChange
      };
    })
  }
};

const ChangeChart = function(props) {
  const data = {
    datasets: [
      AbsChangeDataset(props.game.lines),
      NetChangeDataset(props.game.lines)
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
