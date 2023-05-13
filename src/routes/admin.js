const express = require('express');
const adminsController = require('../controllers/admin');
const validations = require('../validations/admin');

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .post('/', validations.validateCreation, adminsController.createAdmin);

module.exports = router;
