import React from 'react';
import {Pie} from 'react-chartjs-2';

const CategoryCoverChart = function(props) {
  var results = props.games.reduce(function(res, game){
    if (game.score && game.lines.length){
      var diff = game.score.away - game.score.home;
      var spread = game.lines[game.lines.length-1].spread
      if (spread < 0) {
        // home favorite
        if (diff < spread){
          // home cover
          res[0]++;
        }
        else {
          // away cover
          res[1]++;
        }
      }
      else if (spread > 0) {
        // away favorite
        if (diff < spread){
          // home cover
          res[2]++;
        }
        else {
          // away cover
          res[3]++;
        }
      }
    }
    return res;
  }, [0, 0, 0, 0]);

  var favoriteData = {
    labels: ['Home Cover', 'Away Cover'],
    datasets: [
      {
        data: [results[0], results[1]],
        backgroundColor: ['Blue', 'Green']
      }
    ]
  }

  var underdogData = {
    labels: ['Home Cover', 'Away Cover'],
    datasets: [
      {
        data: [results[2], results[3]],
        backgroundColor: ['Red', 'Orange']
      }
    ]
  }

  return (
    <div className="row">
      <div className="col">
        <h3>Home Favorites</h3>
        <Pie data={favoriteData}/>
      </div>
      <div className="col">
        <h3>Away Favorites</h3>
        <Pie data={underdogData}/>
      </div>
    </div>
  );
}

export default CategoryCoverChart;
