import express from 'express';
import adminsController from '../controllers/admin';
import validations from '../validations/admin';

const router = express.Router();

router
  .post('/', validations.validateCreation, adminsController.createAdmin)
  .put('/:id', validations.validateUpdate, adminsController.updateAdmin)
  .get('/', adminsController.getAllAdmins)
  .get('/:id', adminsController.getAdminById)
  .delete('/:id', adminsController.deleteAdmin);

export default router;
