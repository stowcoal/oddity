import React from 'react';
import {Line} from 'react-chartjs-2';

var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];

const AbsChangeDataset = function(lines) {
  var totalChange = 0;
  var prevSpread = lines[0].spread;
  return {
    fill: false,
    borderColor: default_colors[Math.floor(Math.random() * (default_colors.length-1))],
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
    borderColor: default_colors[Math.floor(Math.random() * 19)],
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
