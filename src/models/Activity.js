import mongoose, { Schema } from 'mongoose';

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

export default mongoose.model('Activity', activitySchema);
