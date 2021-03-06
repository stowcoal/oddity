import React from 'react';
import {Scatter} from 'react-chartjs-2';

function buildData(results) {
  return {
    datasets: [
      {
        label: '',
        backgroundColor: 'Green',
        data: results.filter((result) => (result.y !== 0))
      }
    ]
  }
}

const SpreadChangeChart = function(props) {
  var results = props.games.reduce(function(res, game){
    if (game.lines.length){
      var spread = game.lines[game.lines.length-1].spread
      var change = spread - game.lines[0].spread
      //res.push({x: diff, y: game.lines[game.lines.length-1].spread, game: game});
      res.push({x: spread, y: change, game: game});
    }
    return res;
  }, []);

  const data = buildData(results);

  const options = {
    hoverMode: 'single',
    legend: { display: false },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'Absolute Change'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Spread'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItems, data){
          var result = data.datasets[tooltipItems[0].datasetIndex].data[tooltipItems[0].index];
          return (
            result.game.away + ' @ ' + result.game.home
          );
        }
      }
    }
  }

  return <Scatter data={data} options={options}/>;
}

export default SpreadChangeChart;
