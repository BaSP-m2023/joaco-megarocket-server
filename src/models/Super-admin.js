const { mongoose } = require('mongoose');

const { Schema } = mongoose;

const SuperAdminSchema = new Schema({

  id: new mongoose.Types.ObjectId(),
  email: String,
  password: String,

});

module.export = mongoose.model('SuperAdmin', SuperAdminSchema);
