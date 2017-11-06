import React from 'react';
import {Scatter} from 'react-chartjs-2';
import moment from 'moment-timezone';

const ScatterChart = function(props) {
  var results = props.games.reduce(function(res, game){
    if (game.score && game.lines.length){
      var diff = game.score.away - game.score.home;
      res.push({x: diff, y: game.lines[game.lines.length-1].spread, game: game});
    }
    return res;
  }, []);


  const data = {
    datasets: [
      {
        label: 'Home Covers',
        backgroundColor: 'Blue',
        data: results.filter((result) => (result.x > result.y))
      },
      {
        label: 'Push',
        backgroundColor: 'Black',
        data: results.filter((result) => (result.x === result.y))
      },
      {
        label: 'Away Covers',
        backgroundColor: 'Green',
        data: results.filter((result) => (result.x < result.y))
      }
    ]
  };

  console.log(data);

  const options = {
    hoverMode: 'single',
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Spread'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Score Difference'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: function(tooltipItems, data){
          var result = results[tooltipItems[0].index];
          return (
            result.game.away + ' @ ' + result.game.home
          );
        },
        label: function(tooltipItem, data){
          var result = results[tooltipItem.index];
          return (
            result.game.score.away + ' - ' + result.game.score.home + ' (' + result.game.lines[result.game.lines.length-1].spread + ')'
          );
        },
        afterLabel: function(tooltipItem, data){
          var result = results[tooltipItem.index];
          return (
            moment(result.game.start).format('ddd MMM D YYYY h:mm A')
          );
        }
      }
    }
  }

  return <Scatter data={data} options={options}/>;
}

export default ScatterChart;
