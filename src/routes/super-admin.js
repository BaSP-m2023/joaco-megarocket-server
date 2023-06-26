import express from 'express';
import superAdminController from '../controllers/super-admin';
import validations from '../validations/super-admin';

const router = express.Router();

router
  .get('/', superAdminController.getAllSuperAdmins)
  .get('/:id', superAdminController.getSuperAdminsById)
  .post('/', validations.validateCreation, superAdminController.createSuperAdmin)
  .put('/:id', validations.validateUpdate, superAdminController.updateSuperAdmin)
  .delete('/:id', superAdminController.deleteSuperAdminsById);

export default router;
