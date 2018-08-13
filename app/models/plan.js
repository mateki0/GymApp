var mongoose = require('mongoose');

var planSchema = mongoose.Schema ({
  planName: String,
  days: Array,
});

module.exports = mongoose.model('Plan', planSchema)
