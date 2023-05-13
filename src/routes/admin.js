const express = require('express');
const adminsController = require('../controllers/admin');
// eslint-disable-next-line no-unused-vars
const validations = require('../validations/admin');

const router = express.Router();

router
  .post('/', validations.validateCreation, adminsController.createAdmin)
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById);

module.exports = router;
