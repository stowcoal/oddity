var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
  home: {
    type: String
  },
  away: {
    type: String
  },
  start: {
    type: Date
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
