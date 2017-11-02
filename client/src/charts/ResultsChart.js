import React from 'react';
import {Bar} from 'react-chartjs-2';

var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];

const ResultsChart = function(props) {
  var results = props.games.reduce(function(res, game){
    if (game.score){
      var diff = Math.abs(game.score.home - game.score.away);
      if (typeof res[diff] === 'undefined')
        res[diff] = 1;
      else
        res[diff] += 1;
    }
    return res;
  }, []);

  const data = {
    labels: results.map(function(result, i) {
      return i;
    }),
    datasets: [{
      label: 'Score Differentials',
      data: results,
      backgroundColor: results.map(function(result, index){
        return default_colors[index % 20];
      })
    }]
  };

  return <Bar data={data}/>;
}

export default ResultsChart;
