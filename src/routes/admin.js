import express from 'express';
import adminsController from '../controllers/admin';
import validations from '../validations/admin';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();

router
  .post('/', (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN'], next), validations.validateCreation, adminsController.createAdmin)
  .put('/:id', (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN', 'ADMIN'], next), validations.validateUpdate, adminsController.updateAdmin)
  .get('/', (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN'], next), adminsController.getAllAdmins)
  .get('/:id', (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN', 'ADMIN'], next), adminsController.getAdminById)
  .delete('/:id', (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN'], next), adminsController.deleteAdmin);

export default router;
