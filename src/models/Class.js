import mongoose, { Schema } from 'mongoose';

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
    ref: 'Trainer',
  },
  activity: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Activity',
  },
  slots: {
    type: Number,
    default: 50,
  },
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model('Class', classSchema);
