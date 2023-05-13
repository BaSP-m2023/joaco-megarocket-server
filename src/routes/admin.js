const express = require('express');
const adminsController = require('../controllers/admin');
const validations = require('../validations/admin');

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById);

module.exports = router;
