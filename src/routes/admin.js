const express = require('express');
const adminsController = require('../controllers/admin');
// eslint-disable-next-line no-unused-vars
const validations = require('../validations/admin');

const router = express.Router();

router
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById);

module.exports = router;
