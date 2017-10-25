var express = require('express');
var router = express.Router();
var gameController = require('../controllers/game');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/games', function(req, res, next) {
  gameController.getGames(function(data){
    res.json(data);
  });
});

module.exports = router;
