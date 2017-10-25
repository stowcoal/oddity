var Game = require('../models/game');

var api = {};

api.getGames = function(cb) {
  Game.find({start: {$gt: Date.now()}}, function(err, data) {
    return cb(data);
  });
};

api.insertGame = function(game, cb) {
  data = new Game(game);
  data.save(function(err){
    return cb(err, game);
  });
};

api.deleteFuture = function(cb) {
  Game.remove({start: {$gt: Date.now()} }, function(err) {
    return cb(err);
  });
};

module.exports = api;
