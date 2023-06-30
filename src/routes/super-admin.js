import express from 'express';
import superAdminController from '../controllers/super-admin';
import validations from '../validations/super-admin';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN'], next), superAdminController.getAllSuperAdmins);
router.get('/:id', (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN'], next), superAdminController.getSuperAdminsById);
router.post('/', (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN'], next), validations.validateCreation, superAdminController.createSuperAdmin);
router.put('/:id', (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN'], next), validations.validateUpdate, superAdminController.updateSuperAdmin);
router.delete('/:id', (req, res, next) => verifyToken(req, res, ['SUPER_ADMIN'], next), superAdminController.deleteSuperAdminsById);

export default router;
