var Game = require('../models/game');

var api = {};

api.getGames = function(cb) {
  Game.find({start: {$gt: Date.now()}}, function(err, data) {
    return cb(data);
  });
};

api.upsertGame = function(game, cb) {
  Game.findOne({home: game.home, away: game.away, start: game.start}, function(err, data) {
    if (err) {
      cb(err);
    }
    if (!data) {
      data = new Game(game);
    } else {
      data.lines = data.lines.concat(game.lines);
    }
    data.save(function(err){
      return cb(err, game);
    });
  });
};

module.exports = api;
