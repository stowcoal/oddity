import React from 'react';
import {Line} from 'react-chartjs-2';

var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];

const CompareChart = function(props) {
  const data = {
    datasets: props.games.map((game, index) => (
      {
        fill: false,
        lineTension: 0,
        borderColor: default_colors[index % 20],
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
      position: 'bottom'
    }
  };
  return <Line data={data} options={options} height={250}/>;
}

export default CompareChart;
