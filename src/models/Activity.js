const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 15,
    required: true,
  },
  description: {
    type: String,
    minLength: 40,
    maxLength: 250,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
