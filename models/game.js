var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  home: {
    type: String
  },
  away: {
    type: String
  },
  score: {
    home: {
      type: Number
    },
    away: {
      type: Number
    }
  },
  start: {
    type: Date
  },
  updated: {
    type: Date
  },
  result_link: {
    type: String
  },
  lines: [{
    book: {
      type: String
    },
    spread: {
      type: Number
    },
    overunder: {
      type: Number
    },
    timestamp: {
      type: Date
    },
    _id: false
  }]
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;
