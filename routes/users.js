var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
var User = require('../models/UserSchema');

const {forwardAuth} = require('../config/auth'); 

// Halaman Login
router.get('/login', forwardAuth,  (req, res, next) => {
  res.render('login', {
    title: 'Halaman Login'
  });
});

// Halaman Register
router.get('/register', forwardAuth ,(req, res, next) => {
  res.render('register', {
    title: 'Halaman register'
  });
});

router.post('/register',forwardAuth ,(req, res) => {
  // console.log(req.body);
  const {
    name,
    email,
    password,
    password2
  } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'Silahkan lengkapi Data Anda'
    });
    console.log('silahkan lengkapi data anda');
  }
  if (password != password2) {
    errors.push({
      msg: 'Password Tidak Sama'
    });
    console.log('Password Tidak Sama');
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({
      email: email
    }).then(
      user => {
        if (user) {
          console.log("Email Sudah Ada");
          errors.push({
            msg: "email sudah ada"
          });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2
          })
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          newUser.save().then(user => {
            console.log('Selamat Anda Berhasil Daftar, Silahkan Login');
            res.redirect('/auth/login');
          }).catch(err => console.log(err));
        }
      });
  }
});

router.post('/login',forwardAuth ,(req, res, next) => {
  const {
    email,
    password
  } = req.body;

  let errors = [];

  if (!email || !password) {
    errors.push({
      msg: 'Silahkan lengkapi'
    });
    console.log('silahkan lengkapi data anda');
  }
  if (errors.length > 0) {
    res.render("login", {
      errors,
      email,
      password,
    });
  } else {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/auth/login',
      failureFlash: true
    })(req, res, next);
  }
});

//user logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;