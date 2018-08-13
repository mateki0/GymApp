var mongoose = require('mongoose');

var logSchema = mongoose.Schema ({
  date:String,
  userId: String,
  dayName: String,
  exercise0: {
    name: String,
    series: Number,
    reps: Number,
    rpe: Number,
    weight: String
  },
  exercise1: {
    name: String,
    series: Number,
    reps: Number,
    rpe: Number,
    weight: String
  },
  exercise2: {
    name: String,
    series: Number,
    reps: Number,
    rpe: Number,
    weight: String
  },
  exercise3: {
    name: String,
    series: Number,
    reps: Number,
    rpe: Number,
    weight: String
  },
  exercise4: {
    name: String,
    series: Number,
    reps: Number,
    rpe: Number,
    weight: String
  },
  exercise5: {
    name: String,
    series: Number,
    reps: Number,
    rpe: Number,
    weight: String
  },
  exercise6: {
    name: String,
    series: Number,
    reps: Number,
    rpe: Number,
    weight: String
  },
  exercise7: {
    name: String,
    series: Number,
    reps: Number,
    rpe: Number,
    weight: String
  },
  exercise8: {
    name: String,
    series: Number,
    reps: Number,
    rpe: Number,
    weight: String
  },
  exercise9: {
    name: String,
    series: Number,
    reps: Number,
    rpe: Number,
    weight: String
  },

});

module.exports = mongoose.model('Log', logSchema)
