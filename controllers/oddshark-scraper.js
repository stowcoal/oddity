var cheerio = require('cheerio');
var moment = require('moment-timezone');
var extractValues = require('extract-values');
var request = require('request');
var gameController = require('../controllers/game');
var fs = require('fs');
var path = require('path');

var api = {};

api.scrapeOdds = function() {
  return new Promise(function(resolve, reject) {
    request('http://www.oddsshark.com/ncaaf/odds', function(err, res, body) {
      var gameIds = api.parseGames(body);
      Promise.all(gameIds.map(function(gameId){
        return new Promise(function(resolve, reject) {
          request('http://www.oddsshark.com/ncaaf/odds/line-history/' + gameId, function(err, res, body) {
            var game = api.parseGame(body);
            game._id = gameId;
            if (game.lines.length){
              gameController.insertGame(game, function(err, game){
                resolve(game);
              });
            }
            else {
              resolve();
            }
          });
        });
      })).then(function(results) {
        resolve(results);
      });
    });
  });
};

api.scrapeScores = function() {
  var filePath = path.join(__dirname, '..', 'scores.html');
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, function(err, data){
      var games = api.parseScores(data);
      Promise.all(games.map(function(game){
        return new Promise(function(resolve, reject) {
          gameController.upsertGame(game, function(err, game){
            if (err){
              resolve(err);
            }
            else {
              resolve(game);
            }
          });
        });
      })).then(function(results){
        resolve(results);
      });
    });
  });
};

api.parseScores = function(dom) {
  var $ = cheerio.load(dom);
  var games = [];
  $('.matchup-container').each(function(i, elem) {
    var game = {};
    game.home = $(this).find('.home .city').text() + ' ' + $(this).find('.home .nick-name').text();
    game.away = $(this).find('.away .city').text() + ' ' + $(this).find('.away .nick-name').text();
    game.score = {
      home: Number($(this).find('.box-score .home .total-score').text()),
      away: Number($(this).find('.box-score .away .total-score').text())
    };
    game._id = $(this).find('.base-versus').attr('href').split('-').slice(-1).pop();
    games.push(game);
  });
  return games;
};

api.parseGames = function(dom) {
  var $ = cheerio.load(dom);
  var games = [];
  $('a[href^="/ncaaf/odds/line-history"]').each(function(i, elem) {
    games.push($(this).attr('href').replace('/ncaaf/odds/line-history/', ''));
  });
  return games;
};

api.parseGame = function(dom) {
  var $ = cheerio.load(dom);
  var game = {};
  var title = $('.page-title').text();
  game = api.parseTitle(title);
  game.start = moment($('.lh-event-date').text(), 'ddd, MMMM DD, h:mm A').toDate();
  game.lines = [];
  var length = $('.base-table').has('a:contains("Wynn")').find('tbody > tr').length;
  $('.base-table').has('a:contains("Wynn")').find('tbody > tr').each(function(i, elem) {
    var line = {};
    line.timestamp = moment($(this).find('td').eq(0).text(), 'M/D/YY h:mm:ss A').toDate();
    if (line.timestamp.getFullYear() < (new Date(Date.now()).getFullYear() - 1))
      return true;
    var spreadString = $(this).find('td > .left').eq(0).text();
    spreadString = spreadString.replace('Ev', '0');
    line.spread = Number(spreadString);
    line.overunder = Number($(this).find('td > .left').eq(1).text());
    game.lines.push(line);
    if (i === length - 1) {
      var current = {};
      current.timestamp = new Date(Date.now());
      current.spread = line.spread;
      current.overunder = line.overunder;
      game.lines.push(current);
    }
  });
  return game;
};

api.parseTitle = function(str) {
  // #11 USC at #13 Notre Dame - Sat, Oct 21, 7:30 PM ET (402)
  var game = extractValues(str, "Line History - {away} @ {home}");
  return game;
};


module.exports = api;
