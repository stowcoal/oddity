import React from 'react';
import {Bar} from 'react-chartjs-2';

var default_colors = ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'];

function buildData(games, useAbsolute, title) {
  var results = games.reduce(function(res, game){
    if (game.score){
      var diff = useAbsolute ? Math.abs(game.score.home - game.score.away) : game.score.home - game.score.away;
      if (typeof res[diff] === 'undefined')
        res[diff] = 1;
      else
        res[diff] += 1;
    }
    return res;
  }, {});

  var labels = [];
  if (Object.keys(results).length) {
    var min = Object.keys(results).reduce(function(a,b){
      return Math.min(a,b);
    });
    var max = Object.keys(results).reduce(function(a,b){
      return Math.max(a,b);
    });
    for(min; min < max-1; ++min){
      labels.push(min);
    }
  }

  return {
    labels: labels,
    datasets: [{
      label: title,
      data: labels.map(function(result){
        return results[result];
      }),
      backgroundColor: labels.map(function(result, index){
        return default_colors[index % 20];
      })
    }]
  }
}

const ResultsChart = function(props) {
  return (
    <div>
      <Bar data={buildData(props.games, false, "Real Differentials")}/>
      <Bar data={buildData(props.games, true, "Absolute Differentials")}/>
    </div>
  );
}

export default ResultsChart;
