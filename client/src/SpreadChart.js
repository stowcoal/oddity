import React from 'react';
import {Line} from 'react-chartjs-2';

var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];

const SpreadChart = function(props) {
  const data = {
    datasets: [
      {
        fill: false,
        borderColor: default_colors[Math.floor(Math.random() * 19)],
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
        }
      }]
    }
  };
  return <Line data={data} options={options} />;
}

export default SpreadChart;
