var express = require('express');
var router = express.Router();
var gameController = require('../controllers/game');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/games/current', function(req, res, next) {
  gameController.getCurrentGames(function(err, data){
    res.json(data);
  });
});

router.get('/games', function(req, res, next) {
  gameController.getGames(function(err, data){
    res.json(data);
  });
});

router.get('/games/:week', function(req, res, next) {
  gameController.getGamesByWeek(req.params.week, function(err, data){
    res.json(data);
  });
});

router.get('/game/:id', function(req, res, next) {
  gameController.getGame(req.params.id, function(err, data){
    res.json(data);
  });
});

module.exports = router;
