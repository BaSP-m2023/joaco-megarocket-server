import mongoose, { Schema } from 'mongoose';

const SuperAdminSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model('SuperAdmin', SuperAdminSchema);
