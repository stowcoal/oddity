var cheerio = require('cheerio');
var moment = require('moment-timezone');
var extractValues = require('extract-values');
var request = require('request');
var gameController = require('../controllers/game');

var api = {};

api.exec = function() {
  return new Promise(function(resolve, reject) {
    gameController.deleteFuture(function() {
      request('http://www.oddsshark.com/ncaaf/odds', function(err, res, body) {
        var gameIds = api.parseGames(body);
        Promise.all(gameIds.map(function(gameId){
          return new Promise(function(resolve, reject) {
            request('http://www.oddsshark.com/ncaaf/odds/line-history/' + gameId, function(err, res, body) {
              var game = api.parseGame(body);
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
  });
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
  $('.base-table').has('a:contains("Wynn")').find('tbody > tr').each(function(i, elem) {
    var line = {};
    line.timestamp = moment($(this).find('td').eq(0).text(), 'M/D/YY h:mm:ss A').toDate();
    line.spread = Number($(this).find('td > .left').eq(0).text());
    line.overunder = Number($(this).find('td > .left').eq(1).text());
    game.lines.push(line);
  });
  return game;
};

api.parseTitle = function(str) {
  // #11 USC at #13 Notre Dame - Sat, Oct 21, 7:30 PM ET (402)
  var game = extractValues(str, "Line History - {away} @ {home}");
  return game;
};


module.exports = api;
