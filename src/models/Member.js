import mongoose, { Schema } from 'mongoose';

const memberSchema = new Schema({
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
  birthday: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
    minLenght: 4,
  },
  profilePhoto: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  membership: {
    type: String,
    required: true,
    enum: ['Black Membership', 'Classic Membership', 'Only Classes Membership'],
  },
});

export default mongoose.model('Member', memberSchema);
