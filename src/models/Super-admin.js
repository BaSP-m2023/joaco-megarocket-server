const { mongoose } = require('mongoose');

const { Schema } = mongoose;

const SuperAdminSchema = new Schema({

  email: String,
  password: String,

});

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);
