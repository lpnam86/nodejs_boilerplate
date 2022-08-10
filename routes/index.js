var express = require('express');
var router = express.Router();
var db = require('../data_pg')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/users', db.getActors)
router.get('/users/:actor_id', db.getActorbyId)
router.post('/users', db.createActor)
router.put('/users/:actor_id', db.updateActor)
router.delete('/users/:actor_id', db.deleteActor)

module.exports = router;
