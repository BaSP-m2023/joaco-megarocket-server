const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    minLength: 3,
    maxLength: 15,
    required: true,
  },
  description: {
    type: String,
    lowercase: true,
    minLength: 40,
    maxLength: 250,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
