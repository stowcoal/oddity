import React from 'react';
import {Scatter} from 'react-chartjs-2';

const ScatterChart = function(props) {
  var results = props.games.reduce(function(res, game){
    if (game.score && game.lines.length){
      var diff = game.score.away - game.score.home;
      res.push({x: diff, y: game.lines[game.lines.length-1].spread});
    }
    return res;
  }, []);

  const data = {
    datasets: [{
      type: 'scatter',
      label: 'Score Differentials',
      backgroundColor: 'Black',
      data: results
    },
    {
      type: 'line',
      data: [{x: -50, y: -50}, {x: 50, y: 50}]
    }
    ]
  }

  return <Scatter data={data}/>;
}

export default ScatterChart;
