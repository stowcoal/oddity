var cheerio = require('cheerio');
var moment = require('moment-timezone');
var extractValues = require('extract-values');
var request = require('request');
var gameController = require('../controllers/game');
var Game = require('../models/game');
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
              gameController.upsertGame(game, function(err, game){
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

api.backfillOdds = function() {
  return new Promise(function(resolve, reject) {
    Game.find({
      $or: [
        {
          start: {
            $exists: false
          }
        },
        {
          lines: []
        }
      ]
    }
  ).limit(1).exec(function(err, data){
      var games = data;
      Promise.all(games.map(function(game){
        return new Promise(function(resolve, reject) {
          request('http://www.oddsshark.com/ncaaf/odds/line-history/' + game._id, function(err, res, body) {
            var parsedGame = api.parseGame(body);
            if (parsedGame) {
              game.lines = parsedGame.lines;
              game.start = parsedGame.start;
              game.updated = new Date(Date.now());
              console.log('upserting: ' + game._id);
              gameController.upsertGame(game, function(err, game) {
                resolve(game);
              });
            }
            else {
              resolve(game);
            }
          });
        });
      })).then(function(results) {
        resolve(games);
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

api.fillScores = function() {
  return new Promise(function(resolve, reject) {
    gameController.getCompletedGamesWithoutScores(function(err, data){
      var games = data;
      Promise.all(games.map(function(game) {
        console.log('requesting: ' + game.result_link);
        return new Promise(function(resolve, reject) {
          request('http://www.oddsshark.com/' + game.result_link, function(err, res, body) {
            var gameResult = api.parseResult(body);
            game.score = gameResult.score;
            console.log('upserting: ' + game._id);
            gameController.upsertGame(game, function(err, game){
              if (err){
                resolve(err);
              }
              else {
                resolve(game);
              }
            });
          });
        });
      })).then(function(results){
        resolve(results);
      });
    });
  });
};

api.parseResult = function(dom) {
  var game = {};
  var $ = cheerio.load(dom);
  var data = JSON.parse($('#gc-data').html());
  game.score = {
    home: data.oddsshark_gamecenter.scoreboard.data.home_score,
    away: data.oddsshark_gamecenter.scoreboard.data.away_score
  };
  return game;
};

api.parseScores = function(dom) {
  var $ = cheerio.load(dom);
  var games = [];
  $('.matchup-container').each(function(i, elem) {
    if (!$(this).find('.base-versus').hasClass('base-versus-disabled'))
    {
      var game = {};
      game.home = $(this).find('.home .city').text() + ' ' + $(this).find('.home .nick-name').text();
      game.away = $(this).find('.away .city').text() + ' ' + $(this).find('.away .nick-name').text();
      game.result_link = $(this).find('.base-versus').attr('href');
      game.score = {
        home: Number($(this).find('.box-score .home .total-score').text()),
        away: Number($(this).find('.box-score .away .total-score').text())
      };
      game._id = $(this).find('.base-versus').attr('href').split('-').slice(-1).pop();
      games.push(game);
    }
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
  game.result_link = $('.lh-matchup-link .full-matchup').attr('href');
  game.start = api.parseStart($('.lh-matchup-link .full-matchup').attr('href'), $('.lh-event-date').text());
  game.lines = [];
  var book;
  if ($('.base-table').has('a:contains("Wynn")').length) {
    book = "Wynn";
  } else if ($('.base-table').has('a:contains("BOVADA.LV")').length) {
    book = "BOVADA.LV";
  }
  else {
    book = "5Dimes";
  }
  $('.base-table').has('a:contains("' + book + '")').find('tbody > tr').each(function(i, elem) {
    var line = {};
    line.timestamp = moment($(this).find('td').eq(0).text(), 'M/D/YY h:mm:ss A').toDate();
    if (line.timestamp.getFullYear() < (new Date(Date.now()).getFullYear() - 1))
      return true;
    var spreadString = $(this).find('td > .left').eq(0).text();
    spreadString = spreadString.replace('Ev', '0');
    line.spread = Number(spreadString);
    line.overunder = Number($(this).find('td > .left').eq(1).text());
    game.lines.push(line);
  });
  return game;
};

api.parseStart = function(matchup, string) {
  var matchupArray = matchup.split('-');
  var dateString = matchupArray[matchupArray.length-4] + ' ' + matchupArray[matchupArray.length-3] + ' ' + matchupArray[matchupArray.length-2];
  var timeString = string.split(', ').splice(-1, 1);
  var date = moment.tz(dateString + ' ' + timeString, 'MMMM DD YYYY h:mm A', 'America/New_York');
  return date.toDate();
};

api.parseTitle = function(str) {
  // #11 USC at #13 Notre Dame - Sat, Oct 21, 7:30 PM ET (402)
  var game = extractValues(str, "Line History - {away} @ {home}");
  if (game) {
    return game;
  }
  else {
    return {};
  }
};


module.exports = api;
