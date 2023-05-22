const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLenght: 4,
  },
  lastName: {
    type: String,
    required: true,
    minLenght: 4,
  },
  dni: {
    type: Number,
    required: true,
    minLenght: 7,
    maxLenght: 8,
  },
  phone: {
    type: Number,
    required: true,
    minLenght: 10,
    maxLenght: 10,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    minLenght: 4,
  },
  password: {
    type: String,
    required: true,
    minLenght: 8,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
