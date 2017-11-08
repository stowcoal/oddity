import React from 'react';
import {Scatter} from 'react-chartjs-2';
import moment from 'moment-timezone';

function buildHomeAwayDatasets(results) {
  return {
    datasets: [
      {
        label: 'Home Underdogs Covers',
        backgroundColor: 'Red',
        data: results.filter((result) => (result.x >= 0 && result.y < 0))
      },
      {
        label: 'Home Favorites Covers',
        backgroundColor: 'Blue',
        data: results.filter((result) => (result.x <= 0 && result.y < 0))
      },
      {
        label: 'Push',
        backgroundColor: 'Black',
        data: results.filter((result) => (result.y === 0))
      },
      {
        label: 'Away Favorites Covers',
        backgroundColor: 'Orange',
        data: results.filter((result) => (result.x >= 0 && result.y > 0))
      },
      {
        label: 'Away Underdogs Covers',
        backgroundColor: 'Green',
        data: results.filter((result) => (result.x <= 0 && result.y > 0))
      }
    ]
  }
}

const SpreadErrorChart = function(props) {
  var results = props.games.reduce(function(res, game){
    if (game.score && game.lines.length){
      var diff = game.score.away - game.score.home;
      var spread = game.lines[game.lines.length-1].spread
      //res.push({x: diff, y: game.lines[game.lines.length-1].spread, game: game});
      res.push({x: spread, y: diff - spread, game: game});
    }
    return res;
  }, []);

  const data = buildHomeAwayDatasets(results);

  const options = {
    hoverMode: 'single',
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Score Difference'
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
        },
        label: function(tooltipItem, data){
          var result = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return (
            result.game.score.away + ' - ' + result.game.score.home + ' (' + result.game.lines[result.game.lines.length-1].spread + ')'
          );
        },
        afterLabel: function(tooltipItem, data){
          var result = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return (
            moment(result.game.start).format('ddd MMM D YYYY h:mm A')
          );
        }
      }
    }
  }

  return <Scatter data={data} options={options}/>;
}

export default SpreadErrorChart;
