const { mongoose } = require('mongoose');

const { Schema } = mongoose;

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

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);
