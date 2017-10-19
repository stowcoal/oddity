var expect = require('chai').expect;
var scraper = require('../controllers/scraper');
var gameController = require('../controllers/game');
var Game = require('../models/game');
var fs = require('fs');
var path = require('path');
var games = [];

describe('dom parser', function() {
  it('should return game info', function(done) {
    var game = scraper.parseTitle('#11 USC at #13 Notre Dame - Sat, Oct 21, 7:30 PM ET (402)');
    expect(game.away).to.equal('USC');
    expect(game.home).to.equal('Notre Dame');
    expect(game.start.getTime()).to.equal(new Date('10/21/2017 6:30 PM').getTime());
    game = scraper.parseTitle('#24 LSU at Ole Miss - Sat, Oct 21, 7:15 PM ET (406)');
    expect(game.away).to.equal('LSU');
    expect(game.home).to.equal('Ole Miss');
    expect(game.start.getTime()).to.equal(new Date('10/21/2017 6:15 PM').getTime());
    game = scraper.parseTitle('Rice at UT San Antonio - Sat, Oct 21, 7:00 PM ET (0)');
    expect(game.away).to.equal('Rice');
    expect(game.home).to.equal('UT San Antonio');
    expect(game.start.getTime()).to.equal(new Date('10/21/2017 6:00 PM').getTime());
    done();
  });
})

describe('games', function() {
  it('should return array of json', function(done) {
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
  });
});
