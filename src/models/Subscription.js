import mongoose, { Schema } from 'mongoose';

const subscriptionSchema = new Schema({
  classes: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class',
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Member',
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Subscription', subscriptionSchema);
