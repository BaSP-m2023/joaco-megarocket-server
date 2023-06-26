import express from 'express';
import authControllers from '../controllers/auth';
import verifyToken from '../middleware/authMiddleware';
import memberController from '../controllers/member';
import memberValidations from '../validations/member';
import trainerValidations from '../validations/trainer';
import adminValidations from '../validations/admin';
import superAdminValidations from '../validations/super-admin';

const router = express.Router();

router
  .get('/login', verifyToken, authControllers.getAuth)
  .post('/register/members', memberValidations.validateCreation, memberController.createMember)
  .post('/register/admins', adminValidations.validateCreation, memberController.createMember)
  .post('/register/super-admins', superAdminValidations.validateCreation, memberController.createMember)
  .post('/register/trainers', trainerValidations.validateCreation, memberController.createMember);
// .post('/logout', getAuth);

export default router;
