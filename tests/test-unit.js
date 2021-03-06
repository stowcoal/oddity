var expect = require('chai').expect;
var scraper = require('../controllers/oddshark-scraper');
var gameController = require('../controllers/game');
var Game = require('../models/game');
var fs = require('fs');
var path = require('path');
var moment = require('moment-timezone');
var games = [];

describe('dom parser', function() {
  it('should return title info', function(done) {
    var game = scraper.parseTitle('Line History - Toledo Rockets @ Ball State Cardinals');
    expect(game.away).to.equal('Toledo Rockets');
    expect(game.home).to.equal('Ball State Cardinals');
    done();
  });
  it('should return game info', function(done) {
    var filePath = path.join(__dirname, '/lines.html');
    fs.readFile(filePath, function(err, data){
      var games = scraper.parseGames(data);
      var gameIds = [ '793208', '793213',  '793203', '793198', '793218', '793223', '793228', '793433', '793313', '793368', '793233', '793308', '793278', '793333', '793273', '793303', '793288', '793378', '793438', '793353', '794877', '793455', '793323', '793238', '793358', '793348', '793338', '793318', '793298', '793373', '793423', '898425', '793258', '793388', '793428', '899205', '793293', '793418', '793253', '793328', '793383', '793393', '793248', '793268', '793243', '793443', '793343', '793398', '793263', '793363', '793413', '793460', '793448', '793465', '793283', '793453', '793470', '793475', '793480'
      ];
      expect(games).to.deep.equal(gameIds);
      done();
    });
  });
  it('should return game info', function(done) {
    var filePath = path.join(__dirname, '/line.html');
    fs.readFile(filePath, function(err, data){
      var game = scraper.parseGame(data);
      expect(game.home).to.equal('Ball State Cardinals');
      expect(game.away).to.equal('Toledo Rockets');
      expect(game.result_link).to.equal('/ncaaf/toledo-ball-state-odds-october-26-2017-793208');
      expect(game.start.getTime()).to.equal(new Date('10/26/2017 6:00 PM CDT').getTime());
      var lines = [
        { timestamp: new Date("2017-10-22T23:02:13.000Z"), spread: 21.5, overunder: 0 },
        { timestamp: new Date("2017-10-22T23:09:30.000Z"), spread: 22.5, overunder: 0 },
        { timestamp: new Date("2017-10-22T23:54:33.000Z"), spread: 23.5, overunder: 0 },
        { timestamp: new Date("2017-10-23T00:24:46.000Z"), spread: 24.5, overunder: 0 },
        { timestamp: new Date("2017-10-23T15:08:46.000Z"), spread: 25.5, overunder: 0 }
      ];
      for (var index = 0; index < lines.length; ++index) {
        expect(game.lines[index].spread).to.equal(lines[index].spread);
        expect(game.lines[index].overunder).to.equal(lines[index].overunder);
        expect(game.lines[index].timestamp.getTime()).to.equal(lines[index].timestamp.getTime());
      }

      done();
    });
  });
  it('should return nw game info', function(done) {
    var filePath = path.join(__dirname, '/line-nw.html');
    fs.readFile(filePath, function(err, data){
      var game = scraper.parseGame(data);
      expect(game.home).to.equal('Northwestern Wildcats');
      expect(game.away).to.equal('Michigan State Spartans');
      expect(game.start.getTime()).to.equal(new Date('10/28/2017 2:30 PM CDT').getTime());
      var lines = [
        { timestamp: new Date("2017-10-22T23:02:15.000Z"), spread: 0, overunder: 0 },
        { timestamp: new Date("2017-10-22T23:09:31.000Z"), spread: 1, overunder: 0 },
        { timestamp: new Date("2017-10-22T23:54:36.000Z"), spread: 1.5, overunder: 0 },
        { timestamp: new Date("2017-10-23T00:24:48.000Z"), spread: 2, overunder: 0 },
        { timestamp: new Date("2017-10-23T19:23:39.000Z"), spread: 1, overunder: 0 },
        { timestamp: new Date("2017-10-23T21:23:06.000Z"), spread: 1.5, overunder: 0 },
        { timestamp: new Date("2017-10-24T21:34:51.000Z"), spread: 2, overunder: 0 },
        { timestamp: new Date("2017-10-25T17:07:51.000Z"), spread: 2.5, overunder: 0 }
      ];
      for (var index = 0; index < lines.length; ++index) {
        expect(game.lines[index].spread).to.equal(lines[index].spread);
        expect(game.lines[index].overunder).to.equal(lines[index].overunder);
        expect(game.lines[index].timestamp.getTime()).to.equal(lines[index].timestamp.getTime());
      }

      done();
    });
  });
  it('should return nw game info', function(done) {
    var filePath = path.join(__dirname, 'week-8.html');
    fs.readFile(filePath, function(err, data){
      var games = scraper.parseScores(data);
      var testGame = {
        home: 'Arkansas State Red Wolves',
        away: 'Louisiana-Lafayette Ragin\' Cajuns',
        score: {
          home: 47,
          away: 3
        },
        _id: '792923',
        result_link: '/ncaaf/louisiana-lafayette-arkansas-state-odds-october-19-2017-792923'
      };
      expect(games[0]).to.deep.equal(testGame);
      done();
    });
  });
  it('should parse results dom', function(done) {
    var filePath = path.join(__dirname, 'results.html');
    fs.readFile(filePath, function(err, data){
      var game = scraper.parseResult(data);
      expect(game.score.away).to.equal(14);
      expect(game.score.home).to.equal(24);
      done();
    });
  });
  it('should return a valid date object', function(done) {
    var start = scraper.parseStart('/ncaaf/louisiana-lafayette-arkansas-state-odds-october-26-2017-792923', 'Thu, October 26, 7:00 PM')
    expect(start.getTime()).to.equal(new Date('2017-10-26 6:00 PM').getTime());
    start = scraper.parseStart('/ncaaf/montana-state-idaho-odds-september-1-2016-729520', 'Thu, September 1, 9:00 PM')
    expect(start.getTime()).to.equal(new Date('2016-09-01 8:00 PM').getTime());
    done();
  })
});

describe('games', function() {
  var game = {
    _id: '1',
    home: 'Test Team One',
    away: 'Test Team Two',
    start: new Date(Date.now()),
    lines: [
      {
        book: 'Wynn',
        spread: '7',
        timestamp: new Date(Date.now())
      }
    ]
  };
  it('should add a game', function(done) {
    gameController.insertGame(game, function(err) {
      Game.findOne({home: game.home, away: game.away, start: game.start}, function(err, data){
        expect(data.home).to.equal(game.home);
        expect(data.away).to.equal(game.away);
        expect(data.start.getTime()).to.equal(game.start.getTime());
        expect(data.lines.length).to.equal(1);
        expect(data.lines[0].book).to.equal('Wynn');
        expect(data.lines[0].timestamp).to.exist;
        done();
      });
    });
  });
  it ('should delete test game', function(done) {
    Game.remove({home: game.home, away: game.away}, function(err) {
      Game.findOne({home: game.home, away: game.away, start: game.start}, function(err, data){
        expect(data).to.equal(null);
        done();
      });
    });
  });
  it('should get this weeks games', function(done) {
    gameController.getCurrentGames(function(err, data){
      data.forEach(function(game) {
        expect(game.start.getTime()).to.be.above(Date.now());
      });
      done();
    });
  });
  it('should get previous weeks games', function(done) {
    gameController.getGamesByWeek(9, function(err, data){
      data.forEach(function(game) {
        expect(game.start.getTime()).to.be.above(new Date('10/23/2017').getTime());
        expect(game.start.getTime()).to.be.below(new Date('10/29/2017').getTime());
      });
      done();
    });
  });
  it('should get games in the past without a score', function(done) {
    gameController.getCompletedGamesWithoutScores(function(err, games) {
      games.forEach(function(game){
        expect(game.start.getTime()).to.be.below(new Date().getTime());
        expect(game.score.home).to.be.undefined;
        expect(game.score.away).to.be.undefined;
      });
      done();
    });
  })
});
