import React from 'react';
import {Line} from 'react-chartjs-2';

const SpreadPercentChart = function(props) {
  var results = props.games.reduce(function(res, game){
    if (game.score && game.lines.length){
      var margin = .5;
      var spread = game.lines[game.lines.length-1].spread;
      var group = margin > .5 ? (Math.floor(spread / margin) * margin) : spread;
      var diff = game.score.away - game.score.home;
      if (res[group]) {
        diff > spread ? ++res[group].away : ++res[group].home;
      }
      else {
        res[group] = {home: 0, away: 0};
        diff > spread ? ++res[group].away : ++res[group].home;
      }
    }
    return res;
  }, {});

  const data = {
    type: 'line',
    datasets: [{
      label: "Winning Percent",
      borderColor: 'Green',
      fill: false,
      data: Object.keys(results).sort((a, b) => (a-b)).map(function(key) {
        return (results[key].home > 0 && results[key].away > 0) ? (results[key].home / (results[key].away + results[key].home)) : .5;
      })
    }],
    labels: Object.keys(results).sort((a, b) => (a-b))
  };

  const options = {
    legend: { display: false },
    hoverMode: 'single',
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Home Cover Percent'
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
        label: function(tooltipItem, data){
          var record = results[tooltipItem.xLabel];
          return "Home: " + record.home + " Away: " + record.away;
        }
      }
    }
  };


  return <Line data={data} options={options}/>;
}

export default SpreadPercentChart;
