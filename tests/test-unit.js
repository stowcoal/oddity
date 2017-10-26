var expect = require('chai').expect;
var scraper = require('../controllers/oddshark-scraper');
var gameController = require('../controllers/game');
var Game = require('../models/game');
var fs = require('fs');
var path = require('path');
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
      expect(game.start.getTime()).to.equal(new Date('10/26/2017 7:00 PM').getTime());
      var lines = [
        { timestamp: new Date("2017-10-22T23:02:13.000"), spread: 21.5, overunder: 0 },
        { timestamp: new Date("2017-10-22T23:09:30.000"), spread: 22.5, overunder: 0 },
        { timestamp: new Date("2017-10-22T23:54:33.000"), spread: 23.5, overunder: 0 },
        { timestamp: new Date("2017-10-23T00:24:46.000"), spread: 24.5, overunder: 0 },
        { timestamp: new Date("2017-10-23T15:08:46.000"), spread: 25.5, overunder: 0 },
        { timestamp: game.lines[game.lines.length-1].timestamp, spread: 25.5, overunder: 0 }
      ];
      console.log(game);
      for (var index = 0; index < lines.length; ++index) {
        expect(game.lines[index].spread).to.equal(lines[index].spread);
        expect(game.lines[index].overunder).to.equal(lines[index].overunder);
        expect(game.lines[index].timestamp.getTime()).to.equal(lines[index].timestamp.getTime());
      }

      done();
    });
  });
})

describe('games', function() {

  /*it('should return array of json', function(done) {
    var filePath = path.join(__dirname, '/lines.html');
    fs.readFile(filePath, function(err, data){
      games = scraper.parseGames(data);
      games.forEach(function(game){
        expect(game.lines[0].book).to.equal('Wynn');
      });
      done();
    });
  });

  it('should add a game', function(done) {
    var game = games[0];
    gameController.upsertGame(game, function(err) {
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
  it('should add a line', function(done) {
    var game = games[0];
    gameController.upsertGame(game, function(err) {
      Game.findOne({home: game.home, away: game.away, start: game.start}, function(err, data){
        expect(data.lines.length).to.equal(2);
        done();
      });
    });
  });
  describe('clean up', function(){
    it ('should delete test game', function(done) {
    var game = games[0];
      Game.remove({home: game.home, away: game.away}, function(err) {
        Game.findOne({home: game.home, away: game.away, start: game.start}, function(err, data){
          expect(data).to.equal(null);
          done();
        });
      });
    });
  });*/
});
