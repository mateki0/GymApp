var Day = require('../app/models/day');
var User = require('../app/models/user');
var Plan = require('../app/models/plan');
var Log = require('../app/models/log');



module.exports = function(app, passport) {


  // home page
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  //login
  app.get('/login', function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process loginMessage
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));




  // register

  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  // process signup

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));


  // profile

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user,
      plans: req.user.local.plans,
      days: req.user.local.days
    });
  });


  // logout

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });



  // plan

  app.get('/plan', isLoggedIn, function(req, res) {
    res.render('plan.ejs'

    );
  });

  //training day

  app.get('/day/:dayName', isLoggedIn, function(req, res) {
    Day.findOne({
      dayName: req.params.dayName
    }, function(err, day) {
      if (err) throw err;

      res.render('trainingDay.ejs', {
        dayName: day.dayName,
        exercise1: day.exercise1,
        exercise2: day.exercise2,
        exercise3: day.exercise3,
        exercise4: day.exercise4,
        exercise5: day.exercise5,
        exercise6: day.exercise6,
        exercise7: day.exercise7,
        exercise8: day.exercise8,
        exercise9: day.exercise9,
        exercise10: day.exercise10,
      });
    });
  });
  //add Plan

  app.get('/add', isLoggedIn, function(req, res) {
    res.render('add.ejs', {
      plans: req.user.local.plans
    })
  });

  app.post('/add', function(req, res) {
    var newDay = Day({
      dayName: req.body.dayName,
      exercise1: {
        name: req.body.name1,
        series: req.body.series1,
        reps: req.body.reps1,
        rest: req.body.rest1,
        cautions: req.body.cautions1
      },
      exercise2: {
        name: req.body.name2,
        series: req.body.series2,
        reps: req.body.reps2,
        rest: req.body.rest2,
        cautions: req.body.cautions2
      },
      exercise3: {
        name: req.body.name3,
        series: req.body.series3,
        reps: req.body.reps3,
        rest: req.body.rest3,
        cautions: req.body.cautions3
      },
      exercise4: {
        name: req.body.name4,
        series: req.body.series4,
        reps: req.body.reps4,
        rest: req.body.rest4,
        cautions: req.body.cautions4
      },
      exercise5: {
        name: req.body.name5,
        series: req.body.series5,
        reps: req.body.reps5,
        rest: req.body.rest5,
        cautions: req.body.cautions5
      },
      exercise6: {
        name: req.body.name6,
        series: req.body.series6,
        reps: req.body.reps6,
        rest: req.body.rest6,
        cautions: req.body.cautions6
      },
      exercise7: {
        name: req.body.name7,
        series: req.body.series7,
        reps: req.body.reps7,
        rest: req.body.rest7,
        cautions: req.body.cautions7
      },
      exercise8: {
        name: req.body.name8,
        series: req.body.series8,
        reps: req.body.reps8,
        rest: req.body.rest8,
        cautions: req.body.cautions8
      },
      exercise9: {
        name: req.body.name9,
        series: req.body.series9,
        reps: req.body.reps9,
        rest: req.body.rest9,
        cautions: req.body.cautions9
      },
      exercise10: {
        name: req.body.name10,
        series: req.body.series10,
        reps: req.body.reps10,
        rest: req.body.rest10,
        cautions: req.body.cautions10
      },

    });
    newDay.save(function(err) {
      if (err) throw err;
      res.redirect('/profile')
    });




    var user = req.user;
    req.user.local.days.push(req.body.dayName);
    user.save(function(err, user) {
      if (err) throw err;

    });

  });

  app.get('/plan/:planName', isLoggedIn, function(req, res) {
    Plan.findOne({
      planName: req.params.planName
    }, function(err, plan) {
      if (err) throw err;
      res.render('plan.ejs', {
        plan: plan.planName,
        days: plan.days
      })
    });
  });

  app.get('/addPlan', isLoggedIn, function(req, res) {
    res.render('add.ejs', {
      daysNumber: req.query.number
    });

  });


  app.get('/makePlan', isLoggedIn, function(req, res) {
    res.render('makePlan.ejs', {
      days: req.user.local.days
    });
  });

  app.post('/makePlan', function(req, res) {
    var days = (req.body.toAdd).split(',');
    var newPlan = Plan({
      days: days,
      planName: req.body.planName,
    });




    newPlan.save(function(err, plan) {
      if (err) throw err;
      res.redirect('/profile');
    });

    var user = req.user;
    req.user.local.plans.push(req.body.planName);

    user.save(function(err, user) {
      if (err) throw err;
    });
  });

  app.get('/addLog', isLoggedIn, function(req, res) {
    Day.findOne({
      dayName: req.query.dayPick
    }, function(err, day) {

      res.render('addLog.ejs', {
        exercises: day,

      });
    });
  });

  app.post('/addLog', function(req, res) {
    var newLog = Log({
      userId: req.user._id,
      dayName: req.body.trainingName,
      date: req.body.date,
      exercise0: {
        name: req.body.name0,
        series: req.body.series0,
        reps: req.body.reps0,
        rpe: req.body.rpe0,
        weight: req.body.weight0
      },
      exercise1: {
        name: req.body.name1,
        series: req.body.series1,
        reps: req.body.reps1,
        rpe: req.body.rpe1,
        weight: req.body.weight1
      },
      exercise2: {
        name: req.body.name2,
        series: req.body.series2,
        reps: req.body.reps2,
        rpe: req.body.rpe2,
        weight: req.body.weight2
      },
      exercise3: {
        name: req.body.name3,
        series: req.body.series3,
        reps: req.body.reps3,
        rpe: req.body.rpe3,
        weight: req.body.weight3
      },
      exercise4: {
        name: req.body.name4,
        series: req.body.series4,
        reps: req.body.reps4,
        rpe: req.body.rpe4,
        weight: req.body.weight4
      },
      exercise5: {
        name: req.body.name5,
        series: req.body.series5,
        reps: req.body.reps5,
        rpe: req.body.rpe5,
        weight: req.body.weight5
      },
      exercise6: {
        name: req.body.name6,
        series: req.body.series6,
        reps: req.body.reps6,
        rpe: req.body.rpe6,
        weight: req.body.weight6
      },
      exercise7: {
        name: req.body.name7,
        series: req.body.series7,
        reps: req.body.reps7,
        rpe: req.body.rpe7,
        weight: req.body.weight7
      },
      exercise8: {
        name: req.body.name8,
        series: req.body.series8,
        reps: req.body.reps8,
        rpe: req.body.rpe8,
        weight: req.body.weight8
      },
      exercise9: {
        name: req.body.name9,
        series: req.body.series9,
        reps: req.body.reps9,
        rpe: req.body.rpe9,
        weight: req.body.weight9
      },

    });

    newLog.save(function(err, plan) {
      if (err) throw err;
      res.redirect('/profile');
    });
  });


  app.get('/logs', isLoggedIn, function(req, res) {
    Log.find({
      userId: req.user._id,
      dayName: req.query.chooseDay
    }).sort({
      date: 'desc'
    }).exec(function(err, logs) {
      res.render('logs.ejs', {
        logs: logs,
        day: req.query.chooseDay

      });
    })
  })

  app.get('/logs/:id', isLoggedIn, function(req, res) {
    Log.findOne({
      _id: req.params.id
    }, function(err, log) {
      res.render('singleLog.ejs', {
        log: log
      })
    })
  })
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');

}
