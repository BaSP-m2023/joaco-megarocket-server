const express = require('express');
const superAdminController = require('../controllers/super-admin');

const router = express.Router();

router
  .get('/', superAdminController.getAllSuperAdmins)
  .get('/:id', superAdminController.getSuperAdminsById);

module.exports = router;
