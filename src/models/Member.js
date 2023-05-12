const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  postal_code: {
    type: Number,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
  membership: {
    type: String,
    required: true,
    enum: ['Black Membership', 'Classic Membership', 'Only Classes Membership'],
  },
});

module.exports = mongoose.model('Member', memberSchema);
