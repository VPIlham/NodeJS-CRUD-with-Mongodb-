var express = require('express');
var router = express.Router();

const {checkAuth, forwardAuth} = require('../config/auth'); 

/* GET home page. */
router.get('/', forwardAuth ,function(req, res, next) {
  res.render('welcome', { title: 'Halaman Welcome' });
});

//Halaman Dashboard
router.get('/dashboard', checkAuth ,function(req, res, next) {
  res.render('dashboard', { title: 'Halaman Dashboard' });
});

module.exports = router;
