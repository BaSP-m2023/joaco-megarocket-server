const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLenght: 3,
  },
  lastName: {
    type: String,
    required: true,
    minLenght: 3,
  },
  dni: {
    type: Number,
    required: true,
    minLenght: 7,
  },
  phone: {
    type: Number,
    required: true,
    minLenght: 10,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    minLenght: 3,
  },
  birthday: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
    minLenght: 4,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  membership: {
    type: String,
    required: true,
    enum: ['Black Membership', 'Classic Membership', 'Only Classes Membership'],
  },
});

module.exports = mongoose.model('Member', memberSchema);
