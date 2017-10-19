var cheerio = require('cheerio');
var moment = require('moment-timezone');
var extractValues = require('extract-values');
var request = require('request');
var gameController = require('../controllers/game');
var fs = require('fs');

var api = {};

api.exec = function() {
  //request('http://www.espn.com/college-football/lines', function(err, res, body) {
  return new Promise(function(resolve, reject){
    fs.readFile('./tests/lines.html', function(err, body){
      var games = api.parseGames(body);
      Promise.all(games.map(function(game){
        return new Promise(function(resolve, reject){
          gameController.upsertGame(game, function(err, game){
            resolve(game);
          });
        });
      })).then(function(results) {
        resolve(results);
      });
    });
  });
};

api.parseGames = function(dom) {
  var $ = cheerio.load(dom);
  var games = [];
  var game = {};
  $('#my-teams-table tr').each(function(i, elem) {
    if ($(this).hasClass("stathead")) {
      game = api.parseTitle($(this).children('td').text());
    }
    else if ($(this).has('tbody').length > 0){
      var line = {};
      line.book = $(this).children('td').first().text();
      if (line.book === process.env.BOOK) {
        $(this).find('tbody td').first().each(function(i, elem) {
          line.spread = Number($(this).html().split('<br>')[0]);
        });
        line.timestamp = Date.now();
        game.lines.push(line);
        games.push(game);
      }
    }
  });
  return games;
};

api.parseTitle = function(str) {
  // #11 USC at #13 Notre Dame - Sat, Oct 21, 7:30 PM ET (402)
  str = str.replace(/(#\d+ )/g, '');
  var game = extractValues(str, "{away} at {home} - {start} ET");
  game.start = moment.tz(game.start, 'ddd, MMM D, h:mm A', 'America/New_York').toDate();
  game.lines = [];

  return game;
};


module.exports = api;
