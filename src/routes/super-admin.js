const express = require('express');
const superAdminController = require('../controllers/super-admin');
const validation = require('../validations/super-admin');

const router = express.Router();

router
  .get('/', superAdminController.getAllSuperAdmins)
  .get('/:id', superAdminController.getSuperAdminsById)
  .post('/', validation.validateCreation, superAdminController.createSuperAdmin)
  .delete('/:id', superAdminController.deleteAdminsById);

module.exports = router;
