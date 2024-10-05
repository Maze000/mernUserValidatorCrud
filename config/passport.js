const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./model');

module.exports = function (passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {

      User.findOne({ 'local.email': email })
        .then(user => {
          if (user) {

            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {

            var newUser = new User();
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);


            return newUser.save();
          }
        })
        .then(newUser => {

          if (newUser) {
            return done(null, newUser);
          }
        })
        .catch(err => {

          return done(err);
        });
    }
  ));
  
  


  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {

      User.findOne({ 'local.email': email }).then(user => {
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No User found'));
        }
        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Wrong password'));
        }
        return done(null, user);
      }).catch(err => done(err));
    }));
}



