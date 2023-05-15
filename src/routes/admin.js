const express = require('express');
const adminsController = require('../controllers/admin');
const validations = require('../validations/admin');

const router = express.Router();

router
  .post('/', validations.validateCreation, adminsController.createAdmin)
  .put('/:id', validations.validateUpdate, adminsController.updateAdmin)
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .delete('/:id', adminsController.deleteAdmin);

module.exports = router;
