var localStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');


module.exports = function(passport) {

  // passport settings

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });



  // local signup


  passport.use('local-signup', new localStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {

      process.nextTick(function() {


        User.findOne({
          'local.email': email
        }, function(err, user) {
          if (err)

            return done(err);

          // check to see if theres already a user with that email

          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken'));
          } else if (password.length < 8 || password.length > 100) {
            return done(null, false, req.flash('signupMessage', 'Minimum password length is 8 signs '));

          } else {

            // if there is no user with that email
            // create the user

            var newUser = new User();

            // set the user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);


            //save the user

            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));

  // local login


  passport.use('local-login', new localStrategy({

      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {

      User.findOne({
        'local.email': email
      }, function(err, user) {

        if (err)
          return done(err);

        if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));

        //wrong password
        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Wrong password.'));

        return done(null, user);
      });
    }));
};
