var mongoose = require('mongoose');

var daySchema = mongoose.Schema ({
  dayName: String,
  date: String,
    exercise1: {
      name: String,
      series: Number,
      reps: Number,
      rest: String,
      cautions: String
    },
    exercise2: {
      name: String,
      series: Number,
      reps: Number,
      rest: String,
      cautions: String
    },
    exercise3: {
      name: String,
      series: Number,
      reps: Number,
      rest: String,
      cautions: String
    },
    exercise4: {
      name: String,
      series: Number,
      reps: Number,
      rest: String,
      cautions: String
    },
    exercise5: {
      name: String,
      series: Number,
      reps: Number,
      rest: String,
      cautions: String
    },
    exercise6: {
      name: String,
      series: Number,
      reps: Number,
      rest: String,
      cautions: String
    },
    exercise7: {
      name: String,
      series: Number,
      reps: Number,
      rest: String,
      cautions: String
    },
    exercise8: {
      name: String,
      series: Number,
      reps: Number,
      rest: String,
      cautions: String
    },
    exercise9: {
      name: String,
      series: Number,
      reps: Number,
      rest: String,
      cautions: String
    },
    exercise10: {
      name: String,
      series: Number,
      reps: Number,
      rest: String,
      cautions: String
    },


})

module.exports = mongoose.model('Day', daySchema)
