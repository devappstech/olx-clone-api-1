const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, done) => {
    return usersModel.findLocalUser(email)
    .then((user) => {
      if (user.length > 0) {
        const first = user[0];
        bcrypt.compare(password, first.auth_password, function(err, res) {
          if (res) {
            return done(null, user[0].user_id);
          } else {
            return done(null, false);
          }
        })
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      if (err) { return done(err); }
    });
  }
  ));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  return usersModel.findById(user.user_id, user.auth_type)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      if (err) {
        return done(err);
      }
    });
});
