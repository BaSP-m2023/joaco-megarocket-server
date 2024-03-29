import mongoose, { Schema } from 'mongoose';

const trainerSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
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
  profilePhoto: {
    type: String,
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

export default mongoose.model('Trainer', trainerSchema);
