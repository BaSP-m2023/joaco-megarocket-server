const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  classes: {
    type: String,
    required: true,
    enum: ['Crossfit', 'Box', 'Functional', 'Spinning', 'Fitness'],
  },
  member: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.export = mongoose.model('Subscription', subscriptionSchema);
