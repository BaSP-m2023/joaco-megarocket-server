const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  id: new mongoose.Types.ObjectId(),
  name: {
    type: String,
    required: true,
    minLenght: 3,
  },
  description: {
    type: String,
    minLenght: 40,
    required: false,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
