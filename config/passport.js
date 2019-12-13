const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const User = require('../models/UserSchema');

module.exports = function(passport){
  passport.use(new LocalStrategy( { usernameField: 'email'},
    function(email, password, done) {
      User.findOne({
        email: email
      }).then(
        user => {
          if (user) {
            console.log(user.password);
            if (bcrypt.compareSync(password, user.password)) {
             
              return done(null, user);
              
            } else {
              // errors.push({
              //   msg: "Password anda salah, silahkan ulangi!"
              // })
              // res.render('login', {
              //   errors
              // });
              return done(null, false, { message: "Password anda salah, silahkan ulangi!"});
             
            }
          } else {
            console.log(user);
            return done(null, false, { message: "Email anda salah, silahkan ulangi!"});
          }
        });
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}