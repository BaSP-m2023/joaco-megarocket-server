const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: String,
    minLenght: 3,
    required: true,
  },
  description: {
    type: String,
    minLenght: 40,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
