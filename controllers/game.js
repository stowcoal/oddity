var Game = require('../models/game');
var moment = require('moment');

var api = {};

api.getCurrentGames = function(cb) {
  Game.find(
    {
      $and: [
        {start: {$gt: Date.now()}},
        {lines: {$ne: []}}
      ]
    }, function(err, data) {
    return cb(err, data);
  });
};

api.getGames = function(cb) {
  Game.find({}, function(err, data) {
    return cb(err, data);
  });
};

api.getGamesByWeek = function(week, cb) {
  console.log(week);
  Game.find(
    {
      $and: [
        {start: {$gt: moment(Date.now()).week(34 + Number(week)).startOf('week'), $lt: moment().week(34 + Number(week)).endOf('week')}},
        {lines: {$ne: []}}
      ]
    }, function(err, data) {
    return cb(err, data);
  });
};

api.insertGame = function(game, cb) {
  data = new Game(game);
  data.save(function(err){
    return cb(err, game);
  });
};

api.upsertGame = function(game, cb) {
  Game.findOne({_id: game._id}, function(err, data){
    if(err){
      return cb(err);
    }
    if (data){
      if (game.home)
        data.home = game.home;
      if (game.away)
        data.away = game.away;
      if (game.score)
        data.score = game.score;
      if (game.start)
        data.start = game.start;
      if (game.lines && game.lines.length > 0)
        data.lines = game.lines;
      if (game.updated)
        data.updated = game.updated;
    }
    else {
      data = new Game(game);
    }
    data.save(function(err){
      return cb(err, data);
    });
  });
};

api.deleteFuture = function(cb) {
  Game.remove({start: {$gt: Date.now()} }, function(err) {
    return cb(err);
  });
};

module.exports = api;
