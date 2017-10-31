var Game = require('../models/game');
var moment = require('moment');

var api = {};

api.getCurrentGames = function(cb) {
  Game.find({start: {$gt: Date.now()}}, function(err, data) {
    return cb(err, data);
  });
};

api.getGames = function(cb) {
  Game.find({}, function(err, data) {
    return cb(err, data);
  });
};

api.getGamesByWeek = function(week, cb) {
  Game.find({start: {$gt: moment(Date.now()).week(35 + Number(week)).startOf('week'), $lt: moment().week(35 + Number(week)).endOf('week')}}, function(err, data) {
    console.log(data);
    return cb(err, data);
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
