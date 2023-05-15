const mongoose = require('mongoose');

const { Schema } = mongoose;

const classSchema = new Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  trainer: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  activity: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  slots: {
    type: Number,
    default: 10,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Class', classSchema);
