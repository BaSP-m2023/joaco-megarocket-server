const mongoose = require('mongoose');

const { Schema } = mongoose;

const trainerSchema = new Schema({
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
  password: {
    type: String,
    required: true,
    minLenght: 8,
  },
  salary: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Trainer', trainerSchema);
